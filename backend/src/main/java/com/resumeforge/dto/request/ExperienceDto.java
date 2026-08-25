package com.resumeforge.dto.request;

public class ExperienceDto {
    private Long id;
    private String company;
    private String title;
    private String location;
    private String startDate;
    private String endDate;
    private Boolean isCurrent = false;
    private String responsibilities;
    private String achievements;
    private Integer sortOrder = 0;

    public ExperienceDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public Boolean getIsCurrent() { return isCurrent; }
    public void setIsCurrent(Boolean current) { isCurrent = current; }
    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }
    public String getAchievements() { return achievements; }
    public void setAchievements(String achievements) { this.achievements = achievements; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
