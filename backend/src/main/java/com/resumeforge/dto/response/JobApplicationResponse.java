package com.resumeforge.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class JobApplicationResponse {

    private Long id;
    private String company;
    private String jobTitle;
    private String jobDescription;
    private Long resumeId;
    private String resumeTitle;
    private LocalDate applicationDate;
    private String status;
    private String notes;
    private String salary;
    private String location;
    private String jobUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public JobApplicationResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public Long getResumeId() { return resumeId; }
    public void setResumeId(Long resumeId) { this.resumeId = resumeId; }
    public String getResumeTitle() { return resumeTitle; }
    public void setResumeTitle(String resumeTitle) { this.resumeTitle = resumeTitle; }
    public LocalDate getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDate applicationDate) { this.applicationDate = applicationDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getJobUrl() { return jobUrl; }
    public void setJobUrl(String jobUrl) { this.jobUrl = jobUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
