package com.resumeforge.dto.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ATSScoreResponse {

    // Transparent breakdown (100 total pts)
    // Skills (30), Keywords (20), Experience (20), Education (10), Project (10), Certifications (5), Structure (5)
    private int overallScore = 0;
    private int skillsScore = 0; // max 30
    private int keywordsScore = 0; // max 20
    private int experienceScore = 0; // max 20
    private int educationScore = 0; // max 10
    private int projectScore = 0; // max 10
    private int certificationScore = 0; // max 5
    private int structureScore = 0; // max 5

    // Percentage displays for UI
    private int skillsMatchPercentage = 0;
    private int keywordsMatchPercentage = 0;
    private int experienceMatchPercentage = 0;
    private int educationMatchPercentage = 0;
    private int projectRelevancePercentage = 0;
    private int certificationRelevancePercentage = 0;

    // Detailed categorization
    private List<String> matchedSkills = new ArrayList<>();
    private List<String> missingSkills = new ArrayList<>();
    private List<String> partiallyMatchedSkills = new ArrayList<>();
    private Map<String, String> skillMatchExplanations = new HashMap<>();

    private List<String> issues = new ArrayList<>();
    private List<String> suggestions = new ArrayList<>();
    private Map<String, String> keywordPlacements = new HashMap<>(); // Keyword -> Suggested section

    public ATSScoreResponse() {}

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }
    public int getSkillsScore() { return skillsScore; }
    public void setSkillsScore(int skillsScore) { this.skillsScore = skillsScore; }
    public int getKeywordsScore() { return keywordsScore; }
    public void setKeywordsScore(int keywordsScore) { this.keywordsScore = keywordsScore; }
    public int getExperienceScore() { return experienceScore; }
    public void setExperienceScore(int experienceScore) { this.experienceScore = experienceScore; }
    public int getEducationScore() { return educationScore; }
    public void setEducationScore(int educationScore) { this.educationScore = educationScore; }
    public int getProjectScore() { return projectScore; }
    public void setProjectScore(int projectScore) { this.projectScore = projectScore; }
    public int getCertificationScore() { return certificationScore; }
    public void setCertificationScore(int certificationScore) { this.certificationScore = certificationScore; }
    public int getStructureScore() { return structureScore; }
    public void setStructureScore(int structureScore) { this.structureScore = structureScore; }
    public int getSkillsMatchPercentage() { return skillsMatchPercentage; }
    public void setSkillsMatchPercentage(int skillsMatchPercentage) { this.skillsMatchPercentage = skillsMatchPercentage; }
    public int getKeywordsMatchPercentage() { return keywordsMatchPercentage; }
    public void setKeywordsMatchPercentage(int keywordsMatchPercentage) { this.keywordsMatchPercentage = keywordsMatchPercentage; }
    public int getExperienceMatchPercentage() { return experienceMatchPercentage; }
    public void setExperienceMatchPercentage(int experienceMatchPercentage) { this.experienceMatchPercentage = experienceMatchPercentage; }
    public int getEducationMatchPercentage() { return educationMatchPercentage; }
    public void setEducationMatchPercentage(int educationMatchPercentage) { this.educationMatchPercentage = educationMatchPercentage; }
    public int getProjectRelevancePercentage() { return projectRelevancePercentage; }
    public void setProjectRelevancePercentage(int projectRelevancePercentage) { this.projectRelevancePercentage = projectRelevancePercentage; }
    public int getCertificationRelevancePercentage() { return certificationRelevancePercentage; }
    public void setCertificationRelevancePercentage(int certificationRelevancePercentage) { this.certificationRelevancePercentage = certificationRelevancePercentage; }
    public List<String> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }
    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }
    public List<String> getPartiallyMatchedSkills() { return partiallyMatchedSkills; }
    public void setPartiallyMatchedSkills(List<String> partiallyMatchedSkills) { this.partiallyMatchedSkills = partiallyMatchedSkills; }
    public Map<String, String> getSkillMatchExplanations() { return skillMatchExplanations; }
    public void setSkillMatchExplanations(Map<String, String> skillMatchExplanations) { this.skillMatchExplanations = skillMatchExplanations; }
    public List<String> getIssues() { return issues; }
    public void setIssues(List<String> issues) { this.issues = issues; }
    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }
    public Map<String, String> getKeywordPlacements() { return keywordPlacements; }
    public void setKeywordPlacements(Map<String, String> keywordPlacements) { this.keywordPlacements = keywordPlacements; }
}
