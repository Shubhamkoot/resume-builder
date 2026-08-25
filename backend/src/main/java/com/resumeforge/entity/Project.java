package com.resumeforge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String technologies; // comma-separated e.g. "React, Spring Boot, MySQL"
    private String projectUrl;
    private String githubUrl;

    @Column(columnDefinition = "TEXT")
    private String highlights; // bullet points

    private Integer sortOrder = 0;

    public Project() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Resume getResume() { return resume; }
    public void setResume(Resume resume) { this.resume = resume; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    public String getProjectUrl() { return projectUrl; }
    public void setProjectUrl(String projectUrl) { this.projectUrl = projectUrl; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
