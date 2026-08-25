package com.resumeforge.service;

import com.resumeforge.dto.request.JobApplicationRequest;
import com.resumeforge.dto.response.JobApplicationResponse;
import com.resumeforge.entity.JobApplication;
import com.resumeforge.entity.Resume;
import com.resumeforge.entity.User;
import com.resumeforge.exception.ResourceNotFoundException;
import com.resumeforge.exception.UnauthorizedException;
import com.resumeforge.mapper.JobApplicationMapper;
import com.resumeforge.repository.JobApplicationRepository;
import com.resumeforge.repository.ResumeRepository;
import com.resumeforge.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final JobApplicationMapper applicationMapper;
    private final ActivityLogService activityLogService;

    public JobApplicationService(JobApplicationRepository applicationRepository,
                                 UserRepository userRepository,
                                 ResumeRepository resumeRepository,
                                 JobApplicationMapper applicationMapper,
                                 ActivityLogService activityLogService) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.applicationMapper = applicationMapper;
        this.activityLogService = activityLogService;
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getApplicationsForUser(Long userId) {
        List<JobApplication> apps = applicationRepository.findByUserIdOrderByApplicationDateDesc(userId);
        return apps.stream().map(applicationMapper::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public JobApplicationResponse getApplicationById(Long id, Long userId) {
        JobApplication app = getApplicationAndVerifyOwnership(id, userId);
        return applicationMapper.toResponse(app);
    }

    @Transactional
    public JobApplicationResponse createApplication(JobApplicationRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        JobApplication app = new JobApplication();
        app.setUser(user);
        applicationMapper.updateEntity(app, request);

        if (request.getResumeId() != null) {
            Resume resume = resumeRepository.findById(request.getResumeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
            if (!resume.getUser().getId().equals(userId)) {
                throw new UnauthorizedException("Resume does not belong to user");
            }
            app.setResume(resume);
        }

        JobApplication saved = applicationRepository.save(app);
        activityLogService.logActivity(user, "APPLICATION_CREATED", "Applied for " + saved.getJobTitle() + " at " + saved.getCompany(), "APPLICATION", saved.getId());

        return applicationMapper.toResponse(saved);
    }

    @Transactional
    public JobApplicationResponse updateApplication(Long id, JobApplicationRequest request, Long userId) {
        JobApplication app = getApplicationAndVerifyOwnership(id, userId);
        applicationMapper.updateEntity(app, request);

        if (request.getResumeId() != null) {
            Resume resume = resumeRepository.findById(request.getResumeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
            if (!resume.getUser().getId().equals(userId)) {
                throw new UnauthorizedException("Resume does not belong to user");
            }
            app.setResume(resume);
        } else {
            app.setResume(null);
        }

        JobApplication saved = applicationRepository.save(app);
        return applicationMapper.toResponse(saved);
    }

    @Transactional
    public void deleteApplication(Long id, Long userId) {
        JobApplication app = getApplicationAndVerifyOwnership(id, userId);
        applicationRepository.delete(app);
    }

    private JobApplication getApplicationAndVerifyOwnership(Long id, Long userId) {
        JobApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Application not found"));

        if (!app.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to access this application");
        }
        return app;
    }
}
