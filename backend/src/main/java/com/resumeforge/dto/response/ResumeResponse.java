package com.resumeforge.dto.response;

import com.resumeforge.dto.request.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ResumeResponse {

    private Long id;
    private Long userId;
    private String title;
    private String targetRole;
    private String targetCompany;
    private String template;
    private String summary;
    private String sectionOrder;
    private Integer atsScore;
    private Boolean isAiGenerated;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private PersonalInfoDto personalInformation;
    private List<SkillDto> skills = new ArrayList<>();
    private List<EducationDto> education = new ArrayList<>();
    private List<ExperienceDto> experience = new ArrayList<>();
    private List<ProjectDto> projects = new ArrayList<>();
    private List<CertificationDto> certifications = new ArrayList<>();
    private List<AchievementDto> achievements = new ArrayList<>();
    private List<LanguageDto> languages = new ArrayList<>();
    private List<SocialLinkDto> socialLinks = new ArrayList<>();
    private List<ResumeVersionDto> versions = new ArrayList<>();

    public ResumeResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public String getTargetCompany() { return targetCompany; }
    public void setTargetCompany(String targetCompany) { this.targetCompany = targetCompany; }
    public String getTemplate() { return template; }
    public void setTemplate(String template) { this.template = template; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getSectionOrder() { return sectionOrder; }
    public void setSectionOrder(String sectionOrder) { this.sectionOrder = sectionOrder; }
    public Integer getAtsScore() { return atsScore; }
    public void setAtsScore(Integer atsScore) { this.atsScore = atsScore; }
    public Boolean getIsAiGenerated() { return isAiGenerated; }
    public void setIsAiGenerated(Boolean aiGenerated) { isAiGenerated = aiGenerated; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public PersonalInfoDto getPersonalInformation() { return personalInformation; }
    public void setPersonalInformation(PersonalInfoDto personalInformation) { this.personalInformation = personalInformation; }
    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }
    public List<EducationDto> getEducation() { return education; }
    public void setEducation(List<EducationDto> education) { this.education = education; }
    public List<ExperienceDto> getExperience() { return experience; }
    public void setExperience(List<ExperienceDto> experience) { this.experience = experience; }
    public List<ProjectDto> getProjects() { return projects; }
    public void setProjects(List<ProjectDto> projects) { this.projects = projects; }
    public List<CertificationDto> getCertifications() { return certifications; }
    public void setCertifications(List<CertificationDto> certifications) { this.certifications = certifications; }
    public List<AchievementDto> getAchievements() { return achievements; }
    public void setAchievements(List<AchievementDto> achievements) { this.achievements = achievements; }
    public List<LanguageDto> getLanguages() { return languages; }
    public void setLanguages(List<LanguageDto> languages) { this.languages = languages; }
    public List<SocialLinkDto> getSocialLinks() { return socialLinks; }
    public void setSocialLinks(List<SocialLinkDto> socialLinks) { this.socialLinks = socialLinks; }
    public List<ResumeVersionDto> getVersions() { return versions; }
    public void setVersions(List<ResumeVersionDto> versions) { this.versions = versions; }
}
