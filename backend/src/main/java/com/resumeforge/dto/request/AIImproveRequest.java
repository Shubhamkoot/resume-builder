package com.resumeforge.dto.request;

import jakarta.validation.constraints.NotBlank;

public class AIImproveRequest {

    // Types: SUMMARY, EXPERIENCE, PROJECT, SKILLS, ATS_FRIENDLY, CONCISE, ACHIEVEMENTS
    @NotBlank(message = "Improvement type is required")
    private String type;

    @NotBlank(message = "Original text is required")
    private String text;

    private String targetJobTitle;
    private String jobDescription;
    private String additionalContext;

    public AIImproveRequest() {}

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getTargetJobTitle() { return targetJobTitle; }
    public void setTargetJobTitle(String targetJobTitle) { this.targetJobTitle = targetJobTitle; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public String getAdditionalContext() { return additionalContext; }
    public void setAdditionalContext(String additionalContext) { this.additionalContext = additionalContext; }
}
