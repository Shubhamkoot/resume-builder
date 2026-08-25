package com.resumeforge.dto.request;

public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private String technologies;
    private String projectUrl;
    private String githubUrl;
    private String highlights;
    private Integer sortOrder = 0;

    public ProjectDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
