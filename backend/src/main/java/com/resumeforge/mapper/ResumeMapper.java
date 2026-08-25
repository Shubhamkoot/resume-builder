package com.resumeforge.mapper;

import com.resumeforge.dto.request.*;
import com.resumeforge.dto.response.ResumeResponse;
import com.resumeforge.dto.response.ResumeSummaryResponse;
import com.resumeforge.dto.response.ResumeVersionDto;
import com.resumeforge.entity.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ResumeMapper {

    public ResumeResponse toResponse(Resume resume) {
        if (resume == null) return null;

        ResumeResponse response = new ResumeResponse();
        response.setId(resume.getId());
        response.setUserId(resume.getUser() != null ? resume.getUser().getId() : null);
        response.setTitle(resume.getTitle());
        response.setTargetRole(resume.getTargetRole());
        response.setTargetCompany(resume.getTargetCompany());
        response.setTemplate(resume.getTemplate());
        response.setSummary(resume.getSummary());
        response.setSectionOrder(resume.getSectionOrder());
        response.setAtsScore(resume.getAtsScore());
        response.setIsAiGenerated(resume.getIsAiGenerated());
        response.setCreatedAt(resume.getCreatedAt());
        response.setUpdatedAt(resume.getUpdatedAt());

        if (resume.getPersonalInformation() != null) {
            PersonalInformation pi = resume.getPersonalInformation();
            PersonalInfoDto piDto = new PersonalInfoDto();
            piDto.setId(pi.getId());
            piDto.setFullName(pi.getFullName());
            piDto.setProfessionalTitle(pi.getProfessionalTitle());
            piDto.setEmail(pi.getEmail());
            piDto.setPhone(pi.getPhone());
            piDto.setLocation(pi.getLocation());
            piDto.setLinkedin(pi.getLinkedin());
            piDto.setGithub(pi.getGithub());
            piDto.setPortfolio(pi.getPortfolio());
            piDto.setPhotoUrl(pi.getPhotoUrl());
            response.setPersonalInformation(piDto);
        }

        if (resume.getSkills() != null) {
            response.setSkills(resume.getSkills().stream().map(s -> {
                SkillDto dto = new SkillDto();
                dto.setId(s.getId());
                dto.setName(s.getName());
                dto.setCategory(s.getCategory());
                dto.setProficiencyLevel(s.getProficiencyLevel());
                dto.setSortOrder(s.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getEducation() != null) {
            response.setEducation(resume.getEducation().stream().map(e -> {
                EducationDto dto = new EducationDto();
                dto.setId(e.getId());
                dto.setInstitution(e.getInstitution());
                dto.setDegree(e.getDegree());
                dto.setFieldOfStudy(e.getFieldOfStudy());
                dto.setLocation(e.getLocation());
                dto.setStartDate(e.getStartDate());
                dto.setEndDate(e.getEndDate());
                dto.setGrade(e.getGrade());
                dto.setDescription(e.getDescription());
                dto.setSortOrder(e.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getExperience() != null) {
            response.setExperience(resume.getExperience().stream().map(exp -> {
                ExperienceDto dto = new ExperienceDto();
                dto.setId(exp.getId());
                dto.setCompany(exp.getCompany());
                dto.setTitle(exp.getTitle());
                dto.setLocation(exp.getLocation());
                dto.setStartDate(exp.getStartDate());
                dto.setEndDate(exp.getEndDate());
                dto.setIsCurrent(exp.getIsCurrent());
                dto.setResponsibilities(exp.getResponsibilities());
                dto.setAchievements(exp.getAchievements());
                dto.setSortOrder(exp.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getProjects() != null) {
            response.setProjects(resume.getProjects().stream().map(p -> {
                ProjectDto dto = new ProjectDto();
                dto.setId(p.getId());
                dto.setTitle(p.getTitle());
                dto.setDescription(p.getDescription());
                dto.setTechnologies(p.getTechnologies());
                dto.setProjectUrl(p.getProjectUrl());
                dto.setGithubUrl(p.getGithubUrl());
                dto.setHighlights(p.getHighlights());
                dto.setSortOrder(p.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getCertifications() != null) {
            response.setCertifications(resume.getCertifications().stream().map(c -> {
                CertificationDto dto = new CertificationDto();
                dto.setId(c.getId());
                dto.setName(c.getName());
                dto.setIssuer(c.getIssuer());
                dto.setIssueDate(c.getIssueDate());
                dto.setExpirationDate(c.getExpirationDate());
                dto.setCredentialUrl(c.getCredentialUrl());
                dto.setSortOrder(c.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getAchievements() != null) {
            response.setAchievements(resume.getAchievements().stream().map(a -> {
                AchievementDto dto = new AchievementDto();
                dto.setId(a.getId());
                dto.setTitle(a.getTitle());
                dto.setDescription(a.getDescription());
                dto.setDate(a.getDate());
                dto.setSortOrder(a.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getLanguages() != null) {
            response.setLanguages(resume.getLanguages().stream().map(l -> {
                LanguageDto dto = new LanguageDto();
                dto.setId(l.getId());
                dto.setName(l.getName());
                dto.setProficiency(l.getProficiency());
                dto.setSortOrder(l.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getSocialLinks() != null) {
            response.setSocialLinks(resume.getSocialLinks().stream().map(s -> {
                SocialLinkDto dto = new SocialLinkDto();
                dto.setId(s.getId());
                dto.setPlatform(s.getPlatform());
                dto.setUrl(s.getUrl());
                dto.setSortOrder(s.getSortOrder());
                return dto;
            }).collect(Collectors.toList()));
        }

        if (resume.getVersions() != null) {
            response.setVersions(resume.getVersions().stream().map(v -> {
                ResumeVersionDto dto = new ResumeVersionDto();
                dto.setId(v.getId());
                dto.setVersionNumber(v.getVersionNumber());
                dto.setVersionName(v.getVersionName());
                dto.setResumeDataJson(v.getResumeDataJson());
                dto.setCreatedAt(v.getCreatedAt());
                return dto;
            }).collect(Collectors.toList()));
        }

        return response;
    }

    public ResumeSummaryResponse toSummaryResponse(Resume resume) {
        if (resume == null) return null;
        return new ResumeSummaryResponse(
                resume.getId(),
                resume.getTitle(),
                resume.getTargetRole(),
                resume.getTargetCompany(),
                resume.getTemplate(),
                resume.getAtsScore(),
                resume.getIsAiGenerated(),
                resume.getCreatedAt(),
                resume.getUpdatedAt()
        );
    }

    public void updateEntityFromRequest(Resume resume, ResumeRequest request) {
        if (request == null || resume == null) return;

        resume.setTitle(request.getTitle());
        resume.setTargetRole(request.getTargetRole());
        resume.setTargetCompany(request.getTargetCompany());
        if (request.getTemplate() != null) resume.setTemplate(request.getTemplate());
        resume.setSummary(request.getSummary());
        if (request.getSectionOrder() != null) resume.setSectionOrder(request.getSectionOrder());
        if (request.getAtsScore() != null) resume.setAtsScore(request.getAtsScore());
        if (request.getIsAiGenerated() != null) resume.setIsAiGenerated(request.getIsAiGenerated());

        // Personal Info
        if (request.getPersonalInformation() != null) {
            PersonalInformation pi = resume.getPersonalInformation();
            if (pi == null) {
                pi = new PersonalInformation();
                resume.setPersonalInformation(pi);
            }
            PersonalInfoDto piDto = request.getPersonalInformation();
            pi.setFullName(piDto.getFullName());
            pi.setProfessionalTitle(piDto.getProfessionalTitle());
            pi.setEmail(piDto.getEmail());
            pi.setPhone(piDto.getPhone());
            pi.setLocation(piDto.getLocation());
            pi.setLinkedin(piDto.getLinkedin());
            pi.setGithub(piDto.getGithub());
            pi.setPortfolio(piDto.getPortfolio());
            pi.setPhotoUrl(piDto.getPhotoUrl());
        }

        // Skills
        resume.getSkills().clear();
        if (request.getSkills() != null) {
            int order = 0;
            for (SkillDto dto : request.getSkills()) {
                if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
                    Skill s = new Skill();
                    s.setResume(resume);
                    s.setName(dto.getName().trim());
                    s.setCategory(dto.getCategory() != null ? dto.getCategory() : "Technical");
                    s.setProficiencyLevel(dto.getProficiencyLevel());
                    s.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getSkills().add(s);
                }
            }
        }

        // Education
        resume.getEducation().clear();
        if (request.getEducation() != null) {
            int order = 0;
            for (EducationDto dto : request.getEducation()) {
                if (dto.getInstitution() != null && !dto.getInstitution().trim().isEmpty()) {
                    Education e = new Education();
                    e.setResume(resume);
                    e.setInstitution(dto.getInstitution());
                    e.setDegree(dto.getDegree());
                    e.setFieldOfStudy(dto.getFieldOfStudy());
                    e.setLocation(dto.getLocation());
                    e.setStartDate(dto.getStartDate());
                    e.setEndDate(dto.getEndDate());
                    e.setGrade(dto.getGrade());
                    e.setDescription(dto.getDescription());
                    e.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getEducation().add(e);
                }
            }
        }

        // Experience
        resume.getExperience().clear();
        if (request.getExperience() != null) {
            int order = 0;
            for (ExperienceDto dto : request.getExperience()) {
                if (dto.getCompany() != null && !dto.getCompany().trim().isEmpty()) {
                    Experience exp = new Experience();
                    exp.setResume(resume);
                    exp.setCompany(dto.getCompany());
                    exp.setTitle(dto.getTitle());
                    exp.setLocation(dto.getLocation());
                    exp.setStartDate(dto.getStartDate());
                    exp.setEndDate(dto.getEndDate());
                    exp.setIsCurrent(dto.getIsCurrent() != null ? dto.getIsCurrent() : false);
                    exp.setResponsibilities(dto.getResponsibilities());
                    exp.setAchievements(dto.getAchievements());
                    exp.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getExperience().add(exp);
                }
            }
        }

        // Projects
        resume.getProjects().clear();
        if (request.getProjects() != null) {
            int order = 0;
            for (ProjectDto dto : request.getProjects()) {
                if (dto.getTitle() != null && !dto.getTitle().trim().isEmpty()) {
                    Project p = new Project();
                    p.setResume(resume);
                    p.setTitle(dto.getTitle());
                    p.setDescription(dto.getDescription());
                    p.setTechnologies(dto.getTechnologies());
                    p.setProjectUrl(dto.getProjectUrl());
                    p.setGithubUrl(dto.getGithubUrl());
                    p.setHighlights(dto.getHighlights());
                    p.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getProjects().add(p);
                }
            }
        }

        // Certifications
        resume.getCertifications().clear();
        if (request.getCertifications() != null) {
            int order = 0;
            for (CertificationDto dto : request.getCertifications()) {
                if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
                    Certification c = new Certification();
                    c.setResume(resume);
                    c.setName(dto.getName());
                    c.setIssuer(dto.getIssuer());
                    c.setIssueDate(dto.getIssueDate());
                    c.setExpirationDate(dto.getExpirationDate());
                    c.setCredentialUrl(dto.getCredentialUrl());
                    c.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getCertifications().add(c);
                }
            }
        }

        // Achievements
        resume.getAchievements().clear();
        if (request.getAchievements() != null) {
            int order = 0;
            for (AchievementDto dto : request.getAchievements()) {
                if (dto.getTitle() != null && !dto.getTitle().trim().isEmpty()) {
                    Achievement a = new Achievement();
                    a.setResume(resume);
                    a.setTitle(dto.getTitle());
                    a.setDescription(dto.getDescription());
                    a.setDate(dto.getDate());
                    a.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getAchievements().add(a);
                }
            }
        }

        // Languages
        resume.getLanguages().clear();
        if (request.getLanguages() != null) {
            int order = 0;
            for (LanguageDto dto : request.getLanguages()) {
                if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
                    Language l = new Language();
                    l.setResume(resume);
                    l.setName(dto.getName());
                    l.setProficiency(dto.getProficiency());
                    l.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getLanguages().add(l);
                }
            }
        }

        // Social Links
        resume.getSocialLinks().clear();
        if (request.getSocialLinks() != null) {
            int order = 0;
            for (SocialLinkDto dto : request.getSocialLinks()) {
                if (dto.getUrl() != null && !dto.getUrl().trim().isEmpty()) {
                    SocialLink sl = new SocialLink();
                    sl.setResume(resume);
                    sl.setPlatform(dto.getPlatform() != null ? dto.getPlatform() : "Link");
                    sl.setUrl(dto.getUrl());
                    sl.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : order++);
                    resume.getSocialLinks().add(sl);
                }
            }
        }
    }
}
