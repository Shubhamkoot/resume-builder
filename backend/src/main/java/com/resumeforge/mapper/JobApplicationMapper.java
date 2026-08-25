package com.resumeforge.mapper;

import com.resumeforge.dto.request.JobApplicationRequest;
import com.resumeforge.dto.response.JobApplicationResponse;
import com.resumeforge.entity.JobApplication;
import org.springframework.stereotype.Component;

@Component
public class JobApplicationMapper {

    public JobApplicationResponse toResponse(JobApplication application) {
        if (application == null) return null;

        JobApplicationResponse response = new JobApplicationResponse();
        response.setId(application.getId());
        response.setCompany(application.getCompany());
        response.setJobTitle(application.getJobTitle());
        response.setJobDescription(application.getJobDescription());
        if (application.getResume() != null) {
            response.setResumeId(application.getResume().getId());
            response.setResumeTitle(application.getResume().getTitle());
        }
        response.setApplicationDate(application.getApplicationDate());
        response.setStatus(application.getStatus());
        response.setNotes(application.getNotes());
        response.setSalary(application.getSalary());
        response.setLocation(application.getLocation());
        response.setJobUrl(application.getJobUrl());
        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());
        return response;
    }

    public void updateEntity(JobApplication entity, JobApplicationRequest request) {
        if (entity == null || request == null) return;

        entity.setCompany(request.getCompany());
        entity.setJobTitle(request.getJobTitle());
        entity.setJobDescription(request.getJobDescription());
        if (request.getApplicationDate() != null) {
            entity.setApplicationDate(request.getApplicationDate());
        }
        if (request.getStatus() != null) {
            entity.setStatus(request.getStatus());
        }
        entity.setNotes(request.getNotes());
        entity.setSalary(request.getSalary());
        entity.setLocation(request.getLocation());
        entity.setJobUrl(request.getJobUrl());
    }
}
