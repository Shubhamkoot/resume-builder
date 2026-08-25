package com.resumeforge.service;

import com.resumeforge.dto.response.DashboardStatsResponse;
import com.resumeforge.dto.response.ResumeSummaryResponse;
import com.resumeforge.repository.JobApplicationRepository;
import com.resumeforge.repository.JobDescriptionRepository;
import com.resumeforge.repository.ResumeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final ResumeService resumeService;
    private final ActivityLogService activityLogService;

    public DashboardService(ResumeRepository resumeRepository,
                            JobDescriptionRepository jobDescriptionRepository,
                            JobApplicationRepository jobApplicationRepository,
                            ResumeService resumeService,
                            ActivityLogService activityLogService) {
        this.resumeRepository = resumeRepository;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.resumeService = resumeService;
        this.activityLogService = activityLogService;
    }

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats(Long userId) {
        DashboardStatsResponse stats = new DashboardStatsResponse();

        Long totalResumes = resumeRepository.countByUserId(userId);
        Long aiResumes = resumeRepository.countByUserIdAndIsAiGenerated(userId, true);
        Long manualResumes = totalResumes - (aiResumes != null ? aiResumes : 0);
        Double avgAts = resumeRepository.findAverageAtsScoreByUserId(userId);
        Long totalJd = jobDescriptionRepository.countByUserId(userId);
        Long totalApps = jobApplicationRepository.countByUserId(userId);

        stats.setTotalResumes(totalResumes != null ? totalResumes : 0);
        stats.setAiResumes(aiResumes != null ? aiResumes : 0);
        stats.setManualResumes(manualResumes != null ? Math.max(0, manualResumes) : 0);
        stats.setAverageAtsScore(avgAts != null ? Math.round(avgAts * 10.0) / 10.0 : 0.0);
        stats.setJobDescriptionsAnalyzed(totalJd != null ? totalJd : 0);
        stats.setTotalApplications(totalApps != null ? totalApps : 0);

        // Status breakdown
        Map<String, Long> statusMap = new HashMap<>();
        for (String st : List.of("SAVED", "APPLIED", "ASSESSMENT", "INTERVIEW", "SELECTED", "REJECTED")) {
            Long count = jobApplicationRepository.countByUserIdAndStatus(userId, st);
            statusMap.put(st, count != null ? count : 0);
        }
        stats.setApplicationsByStatus(statusMap);

        // Recent resumes
        List<ResumeSummaryResponse> recentResumes = resumeService.getAllResumesForUser(userId);
        if (recentResumes.size() > 5) {
            recentResumes = recentResumes.subList(0, 5);
        }
        stats.setRecentResumes(recentResumes);

        // Recent activity
        stats.setRecentActivity(activityLogService.getRecentActivity(userId, 8));

        return stats;
    }
}
