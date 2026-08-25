package com.resumeforge.dto.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DashboardStatsResponse {

    private long totalResumes = 0;
    private long aiResumes = 0;
    private long manualResumes = 0;
    private double averageAtsScore = 0.0;
    private long jobDescriptionsAnalyzed = 0;
    private long totalApplications = 0;
    private Map<String, Long> applicationsByStatus = new HashMap<>();
    private List<ResumeSummaryResponse> recentResumes = new ArrayList<>();
    private List<ActivityLogResponse> recentActivity = new ArrayList<>();

    public DashboardStatsResponse() {}

    public long getTotalResumes() { return totalResumes; }
    public void setTotalResumes(long totalResumes) { this.totalResumes = totalResumes; }
    public long getAiResumes() { return aiResumes; }
    public void setAiResumes(long aiResumes) { this.aiResumes = aiResumes; }
    public long getManualResumes() { return manualResumes; }
    public void setManualResumes(long manualResumes) { this.manualResumes = manualResumes; }
    public double getAverageAtsScore() { return averageAtsScore; }
    public void setAverageAtsScore(double averageAtsScore) { this.averageAtsScore = averageAtsScore; }
    public long getJobDescriptionsAnalyzed() { return jobDescriptionsAnalyzed; }
    public void setJobDescriptionsAnalyzed(long jobDescriptionsAnalyzed) { this.jobDescriptionsAnalyzed = jobDescriptionsAnalyzed; }
    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }
    public Map<String, Long> getApplicationsByStatus() { return applicationsByStatus; }
    public void setApplicationsByStatus(Map<String, Long> applicationsByStatus) { this.applicationsByStatus = applicationsByStatus; }
    public List<ResumeSummaryResponse> getRecentResumes() { return recentResumes; }
    public void setRecentResumes(List<ResumeSummaryResponse> recentResumes) { this.recentResumes = recentResumes; }
    public List<ActivityLogResponse> getRecentActivity() { return recentActivity; }
    public void setRecentActivity(List<ActivityLogResponse> recentActivity) { this.recentActivity = recentActivity; }
}
