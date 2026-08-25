package com.resumeforge.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AIGenerateResumeRequest {

    @NotNull(message = "Base resume ID is required")
    private Long baseResumeId;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    private String companyName;

    @NotBlank(message = "Job description is required")
    private String jobDescription;

    private String targetTemplate; // Optional template override

    public AIGenerateResumeRequest() {}

    public Long getBaseResumeId() { return baseResumeId; }
    public void setBaseResumeId(Long baseResumeId) { this.baseResumeId = baseResumeId; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public String getTargetTemplate() { return targetTemplate; }
    public void setTargetTemplate(String targetTemplate) { this.targetTemplate = targetTemplate; }
}
