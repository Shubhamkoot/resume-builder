package com.resumeforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_descriptions")
public class JobDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String jobTitle;

    private String companyName;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String rawText;

    private LocalDateTime createdAt = LocalDateTime.now();

    public JobDescription() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getRawText() { return rawText; }
    public void setRawText(String rawText) { this.rawText = rawText; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
