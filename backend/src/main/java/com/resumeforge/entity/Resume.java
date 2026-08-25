package com.resumeforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title = "Untitled Resume";

    private String targetRole;

    private String targetCompany;

    private String template = "ATS_CLASSIC"; // ATS_CLASSIC, MODERN_PRO, SOFTWARE_ENGINEER, CLOUD_DEVOPS, MINIMAL, FRESHER

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String sectionOrder = "summary,skills,experience,projects,education,certifications,achievements,languages";

    private Integer atsScore = 0;

    private Boolean isAiGenerated = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToOne(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private PersonalInformation personalInformation;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> education = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experience = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certification> certifications = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Achievement> achievements = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Language> languages = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SocialLink> socialLinks = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResumeVersion> versions = new ArrayList<>();

    public Resume() {}

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
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
    public PersonalInformation getPersonalInformation() { return personalInformation; }
    public void setPersonalInformation(PersonalInformation personalInformation) { 
        this.personalInformation = personalInformation; 
        if (personalInformation != null) personalInformation.setResume(this);
    }
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
    public List<Education> getEducation() { return education; }
    public void setEducation(List<Education> education) { this.education = education; }
    public List<Experience> getExperience() { return experience; }
    public void setExperience(List<Experience> experience) { this.experience = experience; }
    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }
    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }
    public List<Achievement> getAchievements() { return achievements; }
    public void setAchievements(List<Achievement> achievements) { this.achievements = achievements; }
    public List<Language> getLanguages() { return languages; }
    public void setLanguages(List<Language> languages) { this.languages = languages; }
    public List<SocialLink> getSocialLinks() { return socialLinks; }
    public void setSocialLinks(List<SocialLink> socialLinks) { this.socialLinks = socialLinks; }
    public List<ResumeVersion> getVersions() { return versions; }
    public void setVersions(List<ResumeVersion> versions) { this.versions = versions; }
}
