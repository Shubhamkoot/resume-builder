package com.resumeforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume_versions")
public class ResumeVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false)
    private Integer versionNumber = 1;

    private String versionName; // e.g. "Original Draft", "AI Tailored for ABC Tech"

    @Column(columnDefinition = "LONGTEXT")
    private String resumeDataJson;

    private LocalDateTime createdAt = LocalDateTime.now();

    public ResumeVersion() {}

    public ResumeVersion(Resume resume, Integer versionNumber, String versionName, String resumeDataJson) {
        this.resume = resume;
        this.versionNumber = versionNumber;
        this.versionName = versionName;
        this.resumeDataJson = resumeDataJson;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Resume getResume() { return resume; }
    public void setResume(Resume resume) { this.resume = resume; }
    public Integer getVersionNumber() { return versionNumber; }
    public void setVersionNumber(Integer versionNumber) { this.versionNumber = versionNumber; }
    public String getVersionName() { return versionName; }
    public void setVersionName(String versionName) { this.versionName = versionName; }
    public String getResumeDataJson() { return resumeDataJson; }
    public void setResumeDataJson(String resumeDataJson) { this.resumeDataJson = resumeDataJson; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
