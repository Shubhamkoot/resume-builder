package com.resumeforge.dto.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JobAnalysisResponse {

    private String jobTitle;
    private String companyName;
    private List<String> requiredSkills = new ArrayList<>();
    private List<String> preferredSkills = new ArrayList<>();
    private List<String> programmingLanguages = new ArrayList<>();
    private List<String> frameworks = new ArrayList<>();
    private List<String> cloudTechnologies = new ArrayList<>();
    private List<String> devOpsTechnologies = new ArrayList<>();
    private List<String> databases = new ArrayList<>();
    private List<String> tools = new ArrayList<>();
    private List<String> softSkills = new ArrayList<>();
    private String experienceRequirements;
    private String educationRequirements;
    private List<String> responsibilities = new ArrayList<>();
    private List<String> importantKeywords = new ArrayList<>();

    // Profile match if a resume was provided
    private ATSScoreResponse atsScoreResponse;

    public JobAnalysisResponse() {}

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
    public List<String> getPreferredSkills() { return preferredSkills; }
    public void setPreferredSkills(List<String> preferredSkills) { this.preferredSkills = preferredSkills; }
    public List<String> getProgrammingLanguages() { return programmingLanguages; }
    public void setProgrammingLanguages(List<String> programmingLanguages) { this.programmingLanguages = programmingLanguages; }
    public List<String> getFrameworks() { return frameworks; }
    public void setFrameworks(List<String> frameworks) { this.frameworks = frameworks; }
    public List<String> getCloudTechnologies() { return cloudTechnologies; }
    public void setCloudTechnologies(List<String> cloudTechnologies) { this.cloudTechnologies = cloudTechnologies; }
    public List<String> getDevOpsTechnologies() { return devOpsTechnologies; }
    public void setDevOpsTechnologies(List<String> devOpsTechnologies) { this.devOpsTechnologies = devOpsTechnologies; }
    public List<String> getDatabases() { return databases; }
    public void setDatabases(List<String> databases) { this.databases = databases; }
    public List<String> getTools() { return tools; }
    public void setTools(List<String> tools) { this.tools = tools; }
    public List<String> getSoftSkills() { return softSkills; }
    public void setSoftSkills(List<String> softSkills) { this.softSkills = softSkills; }
    public String getExperienceRequirements() { return experienceRequirements; }
    public void setExperienceRequirements(String experienceRequirements) { this.experienceRequirements = experienceRequirements; }
    public String getEducationRequirements() { return educationRequirements; }
    public void setEducationRequirements(String educationRequirements) { this.educationRequirements = educationRequirements; }
    public List<String> getResponsibilities() { return responsibilities; }
    public void setResponsibilities(List<String> responsibilities) { this.responsibilities = responsibilities; }
    public List<String> getImportantKeywords() { return importantKeywords; }
    public void setImportantKeywords(List<String> importantKeywords) { this.importantKeywords = importantKeywords; }
    public ATSScoreResponse getAtsScoreResponse() { return atsScoreResponse; }
    public void setAtsScoreResponse(ATSScoreResponse atsScoreResponse) { this.atsScoreResponse = atsScoreResponse; }
}
