package com.resumeforge.dto.response;

import java.time.LocalDateTime;

public class ResumeSummaryResponse {
    private Long id;
    private String title;
    private String targetRole;
    private String targetCompany;
    private String template;
    private Integer atsScore;
    private Boolean isAiGenerated;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ResumeSummaryResponse() {}

    public ResumeSummaryResponse(Long id, String title, String targetRole, String targetCompany, String template, Integer atsScore, Boolean isAiGenerated, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.targetRole = targetRole;
        this.targetCompany = targetCompany;
        this.template = template;
        this.atsScore = atsScore;
        this.isAiGenerated = isAiGenerated;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public String getTargetCompany() { return targetCompany; }
    public void setTargetCompany(String targetCompany) { this.targetCompany = targetCompany; }
    public String getTemplate() { return template; }
    public void setTemplate(String template) { this.template = template; }
    public Integer getAtsScore() { return atsScore; }
    public void setAtsScore(Integer atsScore) { this.atsScore = atsScore; }
    public Boolean getIsAiGenerated() { return isAiGenerated; }
    public void setIsAiGenerated(Boolean aiGenerated) { isAiGenerated = aiGenerated; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
