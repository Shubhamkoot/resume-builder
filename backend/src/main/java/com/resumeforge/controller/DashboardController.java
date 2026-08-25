package com.resumeforge.controller;

import com.resumeforge.dto.response.ActivityLogResponse;
import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.DashboardStatsResponse;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.ActivityLogService;
import com.resumeforge.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final ActivityLogService activityLogService;

    public DashboardController(DashboardService dashboardService, ActivityLogService activityLogService) {
        this.dashboardService = dashboardService;
        this.activityLogService = activityLogService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats(@AuthenticationPrincipal UserPrincipal principal) {
        DashboardStatsResponse stats = dashboardService.getDashboardStats(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/activity")
    public ResponseEntity<ApiResponse<List<ActivityLogResponse>>> getActivity(@RequestParam(defaultValue = "10") int limit,
                                                                              @AuthenticationPrincipal UserPrincipal principal) {
        List<ActivityLogResponse> list = activityLogService.getRecentActivity(principal.getId(), limit);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
