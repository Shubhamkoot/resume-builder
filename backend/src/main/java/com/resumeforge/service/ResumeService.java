package com.resumeforge.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeforge.dto.request.ResumeRequest;
import com.resumeforge.dto.response.ResumeResponse;
import com.resumeforge.dto.response.ResumeSummaryResponse;
import com.resumeforge.entity.Resume;
import com.resumeforge.entity.ResumeVersion;
import com.resumeforge.entity.User;
import com.resumeforge.exception.ResourceNotFoundException;
import com.resumeforge.exception.UnauthorizedException;
import com.resumeforge.mapper.ResumeMapper;
import com.resumeforge.repository.ResumeRepository;
import com.resumeforge.repository.ResumeVersionRepository;
import com.resumeforge.repository.UserRepository;
import com.resumeforge.service.ats.ATSScoringService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ResumeVersionRepository resumeVersionRepository;
    private final ResumeMapper resumeMapper;
    private final ATSScoringService atsScoringService;
    private final ActivityLogService activityLogService;
    private final ObjectMapper objectMapper;

    public ResumeService(ResumeRepository resumeRepository,
                         UserRepository userRepository,
                         ResumeVersionRepository resumeVersionRepository,
                         ResumeMapper resumeMapper,
                         ATSScoringService atsScoringService,
                         ActivityLogService activityLogService,
                         ObjectMapper objectMapper) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.resumeVersionRepository = resumeVersionRepository;
        this.resumeMapper = resumeMapper;
        this.atsScoringService = atsScoringService;
        this.activityLogService = activityLogService;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<ResumeSummaryResponse> getAllResumesForUser(Long userId) {
        List<Resume> resumes = resumeRepository.findByUserIdOrderByUpdatedAtDesc(userId);
        return resumes.stream().map(resumeMapper::toSummaryResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<ResumeSummaryResponse> getPagedResumesForUser(Long userId, Pageable pageable) {
        return resumeRepository.findByUserIdOrderByUpdatedAtDesc(userId, pageable)
                .map(resumeMapper::toSummaryResponse);
    }

    @Transactional(readOnly = true)
    public ResumeResponse getResumeById(Long id, Long userId) {
        Resume resume = getResumeAndVerifyOwnership(id, userId);
        return resumeMapper.toResponse(resume);
    }

    @Transactional
    public ResumeResponse createResume(ResumeRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Resume resume = new Resume();
        resume.setUser(user);
        resumeMapper.updateEntityFromRequest(resume, request);

        // Calculate initial ATS score
        int score = atsScoringService.calculateScore(resume, null).getOverallScore();
        resume.setAtsScore(score);

        Resume savedResume = resumeRepository.save(resume);

        // Save Initial Version
        createVersionSnapshot(savedResume, "Initial Version");

        activityLogService.logActivity(user, "RESUME_CREATED", "Created new resume: " + savedResume.getTitle(), "RESUME", savedResume.getId());

        return resumeMapper.toResponse(savedResume);
    }

    @Transactional
    public ResumeResponse updateResume(Long id, ResumeRequest request, Long userId) {
        Resume resume = getResumeAndVerifyOwnership(id, userId);
        resumeMapper.updateEntityFromRequest(resume, request);

        // Recalculate ATS score
        int score = atsScoringService.calculateScore(resume, null).getOverallScore();
        resume.setAtsScore(score);

        Resume updated = resumeRepository.save(resume);

        activityLogService.logActivity(resume.getUser(), "RESUME_UPDATED", "Updated resume: " + updated.getTitle(), "RESUME", updated.getId());

        return resumeMapper.toResponse(updated);
    }

    @Transactional
    public ResumeResponse duplicateResume(Long id, Long userId) {
        Resume source = getResumeAndVerifyOwnership(id, userId);
        ResumeResponse sourceResp = resumeMapper.toResponse(source);

        Resume duplicate = new Resume();
        duplicate.setUser(source.getUser());
        duplicate.setTitle("Copy of " + source.getTitle());
        duplicate.setTargetRole(source.getTargetRole());
        duplicate.setTargetCompany(source.getTargetCompany());
        duplicate.setTemplate(source.getTemplate());
        duplicate.setSummary(source.getSummary());
        duplicate.setSectionOrder(source.getSectionOrder());
        duplicate.setAtsScore(source.getAtsScore());
        duplicate.setIsAiGenerated(source.getIsAiGenerated());

        ResumeRequest req = new ResumeRequest();
        req.setTitle(duplicate.getTitle());
        req.setTargetRole(source.getTargetRole());
        req.setTargetCompany(source.getTargetCompany());
        req.setTemplate(source.getTemplate());
        req.setSummary(source.getSummary());
        req.setSectionOrder(source.getSectionOrder());
        req.setPersonalInformation(sourceResp.getPersonalInformation());
        req.setSkills(sourceResp.getSkills());
        req.setEducation(sourceResp.getEducation());
        req.setExperience(sourceResp.getExperience());
        req.setProjects(sourceResp.getProjects());
        req.setCertifications(sourceResp.getCertifications());
        req.setAchievements(sourceResp.getAchievements());
        req.setLanguages(sourceResp.getLanguages());
        req.setSocialLinks(sourceResp.getSocialLinks());

        resumeMapper.updateEntityFromRequest(duplicate, req);
        Resume saved = resumeRepository.save(duplicate);

        createVersionSnapshot(saved, "Duplicated from " + source.getTitle());
        activityLogService.logActivity(source.getUser(), "RESUME_DUPLICATED", "Duplicated resume: " + source.getTitle(), "RESUME", saved.getId());

        return resumeMapper.toResponse(saved);
    }

    @Transactional
    public void deleteResume(Long id, Long userId) {
        Resume resume = getResumeAndVerifyOwnership(id, userId);
        String title = resume.getTitle();
        User user = resume.getUser();
        resumeRepository.delete(resume);

        activityLogService.logActivity(user, "RESUME_DELETED", "Deleted resume: " + title, "RESUME", id);
    }

    @Transactional
    public void createVersionSnapshot(Resume resume, String versionName) {
        try {
            ResumeResponse resp = resumeMapper.toResponse(resume);
            String json = objectMapper.writeValueAsString(resp);
            int versionNumber = resume.getVersions().size() + 1;
            ResumeVersion version = new ResumeVersion(resume, versionNumber, versionName, json);
            resumeVersionRepository.save(version);
        } catch (Exception ignored) {}
    }

    @Transactional
    public ResumeResponse restoreVersion(Long resumeId, Long versionId, Long userId) {
        Resume resume = getResumeAndVerifyOwnership(resumeId, userId);
        ResumeVersion version = resumeVersionRepository.findById(versionId)
                .orElseThrow(() -> new ResourceNotFoundException("Version not found"));

        if (!version.getResume().getId().equals(resume.getId())) {
            throw new UnauthorizedException("Version does not belong to this resume");
        }

        try {
            ResumeRequest restoredReq = objectMapper.readValue(version.getResumeDataJson(), ResumeRequest.class);
            resumeMapper.updateEntityFromRequest(resume, restoredReq);
            Resume saved = resumeRepository.save(resume);

            createVersionSnapshot(saved, "Restored to " + version.getVersionName());
            return resumeMapper.toResponse(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to restore version: " + e.getMessage());
        }
    }

    public Resume getResumeAndVerifyOwnership(Long resumeId, Long userId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with ID: " + resumeId));

        if (!resume.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to access this resume");
        }
        return resume;
    }
}
