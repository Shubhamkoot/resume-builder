package com.resumeforge.dto.request;

public class ATSAnalyzeRequest {

    private String resumeText;
    private String jobDescription;
    private Long resumeId;

    public ATSAnalyzeRequest() {}

    public String getResumeText() { return resumeText; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public Long getResumeId() { return resumeId; }
    public void setResumeId(Long resumeId) { this.resumeId = resumeId; }
}
