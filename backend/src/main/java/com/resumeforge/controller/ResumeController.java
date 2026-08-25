package com.resumeforge.controller;

import com.resumeforge.dto.request.ResumeRequest;
import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.ResumeResponse;
import com.resumeforge.dto.response.ResumeSummaryResponse;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ResumeSummaryResponse>>> getAllResumes(@AuthenticationPrincipal UserPrincipal principal) {
        List<ResumeSummaryResponse> resumes = resumeService.getAllResumesForUser(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(resumes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeResponse>> getResumeById(@PathVariable Long id,
                                                                    @AuthenticationPrincipal UserPrincipal principal) {
        ResumeResponse resume = resumeService.getResumeById(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(resume));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ResumeResponse>> createResume(@Valid @RequestBody ResumeRequest request,
                                                                   @AuthenticationPrincipal UserPrincipal principal) {
        ResumeResponse created = resumeService.createResume(request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Resume created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeResponse>> updateResume(@PathVariable Long id,
                                                                   @Valid @RequestBody ResumeRequest request,
                                                                   @AuthenticationPrincipal UserPrincipal principal) {
        ResumeResponse updated = resumeService.updateResume(id, request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Resume updated successfully", updated));
    }

    @PostMapping("/{id}/duplicate")
    public ResponseEntity<ApiResponse<ResumeResponse>> duplicateResume(@PathVariable Long id,
                                                                       @AuthenticationPrincipal UserPrincipal principal) {
        ResumeResponse duplicated = resumeService.duplicateResume(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Resume duplicated successfully", duplicated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteResume(@PathVariable Long id,
                                                           @AuthenticationPrincipal UserPrincipal principal) {
        resumeService.deleteResume(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Resume deleted successfully", "Deleted ID: " + id));
    }

    @PostMapping("/{id}/versions/{versionId}/restore")
    public ResponseEntity<ApiResponse<ResumeResponse>> restoreVersion(@PathVariable Long id,
                                                                      @PathVariable Long versionId,
                                                                      @AuthenticationPrincipal UserPrincipal principal) {
        ResumeResponse restored = resumeService.restoreVersion(id, versionId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Resume restored to version successfully", restored));
    }
}
