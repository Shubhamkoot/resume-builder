package com.resumeforge.controller;

import com.resumeforge.dto.request.ATSAnalyzeRequest;
import com.resumeforge.dto.request.JobAnalyzeRequest;
import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.ATSScoreResponse;
import com.resumeforge.dto.response.JobAnalysisResponse;
import com.resumeforge.entity.Resume;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.ResumeService;
import com.resumeforge.service.ai.AIService;
import com.resumeforge.service.ats.ATSScoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ats")
public class ATSController {

    private final ATSScoringService atsScoringService;
    private final AIService aiService;
    private final ResumeService resumeService;

    public ATSController(ATSScoringService atsScoringService, AIService aiService, ResumeService resumeService) {
        this.atsScoringService = atsScoringService;
        this.aiService = aiService;
        this.resumeService = resumeService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse<ATSScoreResponse>> analyzeResumeATS(@RequestBody ATSAnalyzeRequest request,
                                                                         @AuthenticationPrincipal UserPrincipal principal) {
        JobAnalysisResponse jobAnalysis = null;
        if (request.getJobDescription() != null && !request.getJobDescription().isBlank()) {
            JobAnalyzeRequest jdReq = new JobAnalyzeRequest();
            jdReq.setJobDescription(request.getJobDescription());
            jdReq.setJobTitle("Target Role");
            jobAnalysis = aiService.analyzeJobDescription(jdReq);
        }

        ATSScoreResponse response;
        if (request.getResumeId() != null && principal != null) {
            Resume resume = resumeService.getResumeAndVerifyOwnership(request.getResumeId(), principal.getId());
            response = atsScoringService.calculateScore(resume, jobAnalysis);
        } else if (request.getResumeText() != null && !request.getResumeText().isBlank()) {
            response = atsScoringService.calculateScore(request.getResumeText(), jobAnalysis);
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error("Please provide either resumeId or resumeText"));
        }

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
