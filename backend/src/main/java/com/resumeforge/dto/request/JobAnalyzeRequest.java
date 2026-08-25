package com.resumeforge.dto.request;

import jakarta.validation.constraints.NotBlank;

public class JobAnalyzeRequest {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    private String companyName;

    @NotBlank(message = "Job description is required")
    private String jobDescription;

    private Long resumeId; // optional resume ID to match against immediately

    public JobAnalyzeRequest() {}

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public Long getResumeId() { return resumeId; }
    public void setResumeId(Long resumeId) { this.resumeId = resumeId; }
}
