package com.resumeforge.controller;

import com.resumeforge.dto.request.JobApplicationRequest;
import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.JobApplicationResponse;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> getAllApplications(@AuthenticationPrincipal UserPrincipal principal) {
        List<JobApplicationResponse> list = applicationService.getApplicationsForUser(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> getApplicationById(@PathVariable Long id,
                                                                                  @AuthenticationPrincipal UserPrincipal principal) {
        JobApplicationResponse app = applicationService.getApplicationById(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(app));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JobApplicationResponse>> createApplication(@Valid @RequestBody JobApplicationRequest request,
                                                                                 @AuthenticationPrincipal UserPrincipal principal) {
        JobApplicationResponse created = applicationService.createApplication(request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Job application saved", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> updateApplication(@PathVariable Long id,
                                                                                 @Valid @RequestBody JobApplicationRequest request,
                                                                                 @AuthenticationPrincipal UserPrincipal principal) {
        JobApplicationResponse updated = applicationService.updateApplication(id, request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Job application updated", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteApplication(@PathVariable Long id,
                                                                 @AuthenticationPrincipal UserPrincipal principal) {
        applicationService.deleteApplication(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Job application deleted", "Deleted ID: " + id));
    }
}
