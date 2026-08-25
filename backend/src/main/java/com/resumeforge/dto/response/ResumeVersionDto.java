package com.resumeforge.dto.response;

import java.time.LocalDateTime;

public class ResumeVersionDto {
    private Long id;
    private Integer versionNumber;
    private String versionName;
    private String resumeDataJson;
    private LocalDateTime createdAt;

    public ResumeVersionDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getVersionNumber() { return versionNumber; }
    public void setVersionNumber(Integer versionNumber) { this.versionNumber = versionNumber; }
    public String getVersionName() { return versionName; }
    public void setVersionName(String versionName) { this.versionName = versionName; }
    public String getResumeDataJson() { return resumeDataJson; }
    public void setResumeDataJson(String resumeDataJson) { this.resumeDataJson = resumeDataJson; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
