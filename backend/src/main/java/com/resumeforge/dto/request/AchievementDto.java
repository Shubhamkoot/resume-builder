package com.resumeforge.dto.request;

public class AchievementDto {
    private Long id;
    private String title;
    private String description;
    private String date;
    private Integer sortOrder = 0;

    public AchievementDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
