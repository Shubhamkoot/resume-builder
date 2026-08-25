package com.resumeforge.controller;

import com.resumeforge.dto.request.AIGenerateResumeRequest;
import com.resumeforge.dto.request.AIImproveRequest;
import com.resumeforge.dto.request.JobAnalyzeRequest;
import com.resumeforge.dto.request.ResumeRequest;
import com.resumeforge.dto.response.AIImproveResponse;
import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.JobAnalysisResponse;
import com.resumeforge.dto.response.ResumeResponse;
import com.resumeforge.entity.JobDescription;
import com.resumeforge.entity.Resume;
import com.resumeforge.entity.User;
import com.resumeforge.repository.JobDescriptionRepository;
import com.resumeforge.repository.UserRepository;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.ActivityLogService;
import com.resumeforge.service.ResumeService;
import com.resumeforge.service.ai.AIService;
import com.resumeforge.service.ats.ATSScoringService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;
    private final ResumeService resumeService;
    private final ATSScoringService atsScoringService;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;

    public AIController(AIService aiService,
                        ResumeService resumeService,
                        ATSScoringService atsScoringService,
                        JobDescriptionRepository jobDescriptionRepository,
                        UserRepository userRepository,
                        ActivityLogService activityLogService) {
        this.aiService = aiService;
        this.resumeService = resumeService;
        this.atsScoringService = atsScoringService;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.userRepository = userRepository;
        this.activityLogService = activityLogService;
    }

    @PostMapping("/analyze-job")
    public ResponseEntity<ApiResponse<JobAnalysisResponse>> analyzeJob(@Valid @RequestBody JobAnalyzeRequest request,
                                                                       @AuthenticationPrincipal UserPrincipal principal) {
        JobAnalysisResponse analysis = aiService.analyzeJobDescription(request);

        // If user is authenticated, save the JD into their history
        if (principal != null) {
            User user = userRepository.findById(principal.getId()).orElse(null);
            if (user != null) {
                JobDescription jd = new JobDescription();
                jd.setUser(user);
                jd.setJobTitle(request.getJobTitle());
                jd.setCompanyName(request.getCompanyName());
                jd.setRawText(request.getJobDescription());
                jobDescriptionRepository.save(jd);

                activityLogService.logActivity(user, "JD_ANALYZED", "Analyzed JD for " + request.getJobTitle(), "JOB_ANALYSIS", jd.getId());
            }
        }

        // If a resume ID was provided, compute the ATS match against this JD
        if (request.getResumeId() != null && principal != null) {
            Resume resume = resumeService.getResumeAndVerifyOwnership(request.getResumeId(), principal.getId());
            analysis.setAtsScoreResponse(atsScoringService.calculateScore(resume, analysis));
        }

        return ResponseEntity.ok(ApiResponse.success("Job description analyzed successfully", analysis));
    }

    @PostMapping("/generate-resume")
    public ResponseEntity<ApiResponse<ResumeResponse>> generateTailoredResume(@Valid @RequestBody AIGenerateResumeRequest request,
                                                                             @AuthenticationPrincipal UserPrincipal principal) {
        ResumeResponse baseResume = resumeService.getResumeById(request.getBaseResumeId(), principal.getId());

        ResumeResponse tailored = aiService.generateTailoredResume(
                baseResume,
                request.getJobTitle(),
                request.getCompanyName(),
                request.getJobDescription()
        );

        if (request.getTargetTemplate() != null && !request.getTargetTemplate().isBlank()) {
            tailored.setTemplate(request.getTargetTemplate());
        }

        // Save as a new tailored resume in database
        ResumeRequest saveReq = new ResumeRequest();
        saveReq.setTitle(tailored.getTitle());
        saveReq.setTargetRole(tailored.getTargetRole());
        saveReq.setTargetCompany(tailored.getTargetCompany());
        saveReq.setTemplate(tailored.getTemplate());
        saveReq.setSummary(tailored.getSummary());
        saveReq.setSectionOrder(tailored.getSectionOrder());
        saveReq.setIsAiGenerated(true);
        saveReq.setPersonalInformation(tailored.getPersonalInformation());
        saveReq.setSkills(tailored.getSkills());
        saveReq.setEducation(tailored.getEducation());
        saveReq.setExperience(tailored.getExperience());
        saveReq.setProjects(tailored.getProjects());
        saveReq.setCertifications(tailored.getCertifications());
        saveReq.setAchievements(tailored.getAchievements());
        saveReq.setLanguages(tailored.getLanguages());
        saveReq.setSocialLinks(tailored.getSocialLinks());

        ResumeResponse saved = resumeService.createResume(saveReq, principal.getId());

        // Log AI tailoring activity
        User user = userRepository.findById(principal.getId()).orElse(null);
        if (user != null) {
            activityLogService.logActivity(user, "AI_OPTIMIZED", "Generated AI tailored resume: " + saved.getTitle(), "RESUME", saved.getId());
        }

        return ResponseEntity.ok(ApiResponse.success("Tailored resume generated successfully", saved));
    }

    @PostMapping("/improve")
    public ResponseEntity<ApiResponse<AIImproveResponse>> improveContent(@Valid @RequestBody AIImproveRequest request) {
        AIImproveResponse response = aiService.improveContent(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/improve-summary")
    public ResponseEntity<ApiResponse<AIImproveResponse>> improveSummary(@RequestBody AIImproveRequest request) {
        request.setType("SUMMARY");
        AIImproveResponse response = aiService.improveContent(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/improve-experience")
    public ResponseEntity<ApiResponse<AIImproveResponse>> improveExperience(@RequestBody AIImproveRequest request) {
        request.setType("EXPERIENCE");
        AIImproveResponse response = aiService.improveContent(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/improve-project")
    public ResponseEntity<ApiResponse<AIImproveResponse>> improveProject(@RequestBody AIImproveRequest request) {
        request.setType("PROJECT");
        AIImproveResponse response = aiService.improveContent(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
