package com.resumeforge.dto.request;

public class EducationDto {
    private Long id;
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private String location;
    private String startDate;
    private String endDate;
    private String grade;
    private String description;
    private Integer sortOrder = 0;

    public EducationDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
