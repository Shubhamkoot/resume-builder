package com.resumeforge.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class JobApplicationRequest {

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    private String jobDescription;
    private Long resumeId;
    private LocalDate applicationDate = LocalDate.now();
    private String status = "APPLIED";
    private String notes;
    private String salary;
    private String location;
    private String jobUrl;

    public JobApplicationRequest() {}

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public Long getResumeId() { return resumeId; }
    public void setResumeId(Long resumeId) { this.resumeId = resumeId; }
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
}
