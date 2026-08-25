package com.resumeforge.service.ats;

import com.resumeforge.dto.request.ResumeRequest;
import com.resumeforge.dto.response.ATSScoreResponse;
import com.resumeforge.dto.response.JobAnalysisResponse;
import com.resumeforge.entity.Resume;
import com.resumeforge.mapper.ResumeMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ATSScoringService {

    private final ResumeMapper resumeMapper;

    public ATSScoringService(ResumeMapper resumeMapper) {
        this.resumeMapper = resumeMapper;
    }

    public ATSScoreResponse calculateScore(Resume resume, JobAnalysisResponse jobAnalysis) {
        return calculateScore(resumeMapper.toResponse(resume), jobAnalysis);
    }

    public ATSScoreResponse calculateScore(Object resumeObj, JobAnalysisResponse jd) {
        ATSScoreResponse response = new ATSScoreResponse();

        String fullText = extractTextFromResume(resumeObj);
        List<String> resumeSkills = extractSkillsFromResume(resumeObj);
        int experienceCount = getExperienceCount(resumeObj);
        int projectCount = getProjectCount(resumeObj);
        int educationCount = getEducationCount(resumeObj);
        int certCount = getCertificationCount(resumeObj);
        boolean hasSummary = hasSummary(resumeObj);
        boolean hasContact = hasContactInfo(resumeObj);

        List<String> requiredSkills = jd != null && jd.getRequiredSkills() != null ? jd.getRequiredSkills() : Collections.emptyList();
        List<String> preferredSkills = jd != null && jd.getPreferredSkills() != null ? jd.getPreferredSkills() : Collections.emptyList();
        List<String> keywords = jd != null && jd.getImportantKeywords() != null ? jd.getImportantKeywords() : Collections.emptyList();

        // 1. Skills Match (Max 30 points)
        List<String> matched = new ArrayList<>();
        List<String> missing = new ArrayList<>();
        List<String> partial = new ArrayList<>();
        Map<String, String> explanations = new HashMap<>();

        Set<String> allJdSkills = new LinkedHashSet<>();
        allJdSkills.addAll(requiredSkills);
        allJdSkills.addAll(preferredSkills);

        if (allJdSkills.isEmpty()) {
            // Default check if no JD provided
            allJdSkills.addAll(Arrays.asList("Java", "Spring Boot", "REST API", "SQL", "Git", "Docker", "CI/CD"));
        }

        int matchedCount = 0;
        for (String skill : allJdSkills) {
            String cleanSkill = skill.trim();
            if (cleanSkill.isEmpty()) continue;

            boolean directMatch = resumeSkills.stream().anyMatch(s -> s.equalsIgnoreCase(cleanSkill));
            boolean textMatch = containsWord(fullText, cleanSkill);

            if (directMatch) {
                matched.add(cleanSkill);
                explanations.put(cleanSkill, "Exact match in Skills section");
                matchedCount += 2;
            } else if (textMatch) {
                partial.add(cleanSkill);
                explanations.put(cleanSkill, "Mentioned in experience/projects but not listed as a core skill");
                matchedCount += 1;
            } else {
                missing.add(cleanSkill);
                explanations.put(cleanSkill, "Not found in your resume profile");
            }
        }

        double skillRatio = allJdSkills.isEmpty() ? 1.0 : (double) matchedCount / (allJdSkills.size() * 2.0);
        int skillsScore = (int) Math.round(Math.min(30, skillRatio * 30));
        int skillsPercentage = (int) Math.round(Math.min(100, skillRatio * 100));

        // 2. Keyword Match (Max 20 points)
        int matchedKeywordsCount = 0;
        Map<String, String> keywordPlacements = new HashMap<>();
        List<String> searchKeywords = keywords.isEmpty() ? new ArrayList<>(allJdSkills) : keywords;

        for (String kw : searchKeywords) {
            if (containsWord(fullText, kw)) {
                matchedKeywordsCount++;
                if (resumeSkills.stream().anyMatch(s -> s.equalsIgnoreCase(kw))) {
                    keywordPlacements.put(kw, "Skills Section");
                } else if (fullText.toLowerCase().contains("experience") && containsWord(fullText, kw)) {
                    keywordPlacements.put(kw, "Work Experience");
                } else {
                    keywordPlacements.put(kw, "Projects");
                }
            } else {
                keywordPlacements.put(kw, "Recommended to add to Skills/Projects");
            }
        }

        double kwRatio = searchKeywords.isEmpty() ? 0.8 : (double) matchedKeywordsCount / searchKeywords.size();
        int keywordsScore = (int) Math.round(Math.min(20, kwRatio * 20));
        int keywordsPercentage = (int) Math.round(Math.min(100, kwRatio * 100));

        // 3. Experience Match (Max 20 points)
        int experienceScore = 0;
        if (experienceCount >= 3) experienceScore = 20;
        else if (experienceCount == 2) experienceScore = 16;
        else if (experienceCount == 1) experienceScore = 12;
        else experienceScore = 5;

        // Check bullet point strength
        if (fullText.matches(".*\\d+%|.*\\$\\d+|.*\\d+\\+? (years|users|clients|features|services).*")) {
            experienceScore = Math.min(20, experienceScore + 2);
        }
        int experiencePercentage = (int) Math.round((experienceScore / 20.0) * 100);

        // 4. Education Match (Max 10 points)
        int educationScore = educationCount > 0 ? 10 : 3;
        int educationPercentage = (int) Math.round((educationScore / 10.0) * 100);

        // 5. Project Relevance (Max 10 points)
        int projectScore = 0;
        if (projectCount >= 3) projectScore = 10;
        else if (projectCount == 2) projectScore = 8;
        else if (projectCount == 1) projectScore = 6;
        else projectScore = 2;
        int projectPercentage = (int) Math.round((projectScore / 10.0) * 100);

        // 6. Certifications (Max 5 points)
        int certScore = certCount > 0 ? 5 : (allJdSkills.size() > 5 ? 2 : 5);
        int certPercentage = (int) Math.round((certScore / 5.0) * 100);

        // 7. Resume Structure (Max 5 points)
        int structureScore = 0;
        if (hasContact) structureScore += 2;
        if (hasSummary) structureScore += 2;
        if (fullText.length() > 300) structureScore += 1;

        int overallScore = skillsScore + keywordsScore + experienceScore + educationScore + projectScore + certScore + structureScore;
        overallScore = Math.min(100, Math.max(10, overallScore));

        // Generate Issues and Suggestions
        List<String> issues = new ArrayList<>();
        List<String> suggestions = new ArrayList<>();

        if (!missing.isEmpty()) {
            issues.add("Missing " + missing.size() + " key target skills from the job description: " + String.join(", ", missing.subList(0, Math.min(4, missing.size()))));
            suggestions.add("Incorporate relevant technical skills into your profile if you have prior exposure.");
        }
        if (!hasSummary || fullText.toLowerCase().contains("responsible for")) {
            issues.add("Summary or bullet points use passive phrases instead of high-impact action verbs.");
            suggestions.add("Use the 'AI Resume Improvement' tool to strengthen action verbs and quantify outcomes.");
        }
        if (!fullText.matches(".*\\d+%.*|.*\\d+\\+? (users|requests|ms|times|clients).*")) {
            issues.add("Work experience lacks measurable business impact metrics (percentages, scale, numbers).");
            suggestions.add("Include quantifiable metrics (e.g. 'reduced latency by 35%', 'handled 50k daily active users').");
        }
        if (projectCount < 2) {
            suggestions.add("Add at least 2 relevant technical projects demonstrating end-to-end implementation.");
        }
        if (certCount == 0) {
            suggestions.add("Include relevant industry certifications (e.g. AWS Certified, Oracle Java, etc.) if completed.");
        }

        response.setOverallScore(overallScore);
        response.setSkillsScore(skillsScore);
        response.setKeywordsScore(keywordsScore);
        response.setExperienceScore(experienceScore);
        response.setEducationScore(educationScore);
        response.setProjectScore(projectScore);
        response.setCertificationScore(certScore);
        response.setStructureScore(structureScore);

        response.setSkillsMatchPercentage(skillsPercentage);
        response.setKeywordsMatchPercentage(keywordsPercentage);
        response.setExperienceMatchPercentage(experiencePercentage);
        response.setEducationMatchPercentage(educationPercentage);
        response.setProjectRelevancePercentage(projectPercentage);
        response.setCertificationRelevancePercentage(certPercentage);

        response.setMatchedSkills(matched);
        response.setMissingSkills(missing);
        response.setPartiallyMatchedSkills(partial);
        response.setSkillMatchExplanations(explanations);
        response.setIssues(issues);
        response.setSuggestions(suggestions);
        response.setKeywordPlacements(keywordPlacements);

        return response;
    }

    private boolean containsWord(String source, String word) {
        if (source == null || word == null || word.trim().isEmpty()) return false;
        String regex = "\\b" + Pattern.quote(word.trim().toLowerCase()) + "\\b";
        return Pattern.compile(regex, Pattern.CASE_INSENSITIVE).matcher(source.toLowerCase()).find();
    }

    private String extractTextFromResume(Object resumeObj) {
        StringBuilder sb = new StringBuilder();
        if (resumeObj instanceof Resume r) {
            if (r.getSummary() != null) sb.append(r.getSummary()).append(" ");
            if (r.getTargetRole() != null) sb.append(r.getTargetRole()).append(" ");
            if (r.getSkills() != null) r.getSkills().forEach(s -> sb.append(s.getName()).append(" "));
            if (r.getExperience() != null) r.getExperience().forEach(e -> {
                sb.append(e.getTitle()).append(" ").append(e.getCompany()).append(" ")
                  .append(e.getResponsibilities()).append(" ").append(e.getAchievements()).append(" ");
            });
            if (r.getProjects() != null) r.getProjects().forEach(p -> {
                sb.append(p.getTitle()).append(" ").append(p.getTechnologies()).append(" ")
                  .append(p.getDescription()).append(" ").append(p.getHighlights()).append(" ");
            });
            if (r.getEducation() != null) r.getEducation().forEach(e -> {
                sb.append(e.getDegree()).append(" ").append(e.getInstitution()).append(" ").append(e.getFieldOfStudy()).append(" ");
            });
            if (r.getCertifications() != null) r.getCertifications().forEach(c -> {
                sb.append(c.getName()).append(" ").append(c.getIssuer()).append(" ");
            });
        } else if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r) {
            if (r.getSummary() != null) sb.append(r.getSummary()).append(" ");
            if (r.getTargetRole() != null) sb.append(r.getTargetRole()).append(" ");
            if (r.getSkills() != null) r.getSkills().forEach(s -> sb.append(s.getName()).append(" "));
            if (r.getExperience() != null) r.getExperience().forEach(e -> {
                sb.append(e.getTitle()).append(" ").append(e.getCompany()).append(" ")
                  .append(e.getResponsibilities()).append(" ").append(e.getAchievements()).append(" ");
            });
            if (r.getProjects() != null) r.getProjects().forEach(p -> {
                sb.append(p.getTitle()).append(" ").append(p.getTechnologies()).append(" ")
                  .append(p.getDescription()).append(" ").append(p.getHighlights()).append(" ");
            });
            if (r.getEducation() != null) r.getEducation().forEach(e -> {
                sb.append(e.getDegree()).append(" ").append(e.getInstitution()).append(" ").append(e.getFieldOfStudy()).append(" ");
            });
            if (r.getCertifications() != null) r.getCertifications().forEach(c -> {
                sb.append(c.getName()).append(" ").append(c.getIssuer()).append(" ");
            });
        } else if (resumeObj instanceof ResumeRequest r) {
            if (r.getSummary() != null) sb.append(r.getSummary()).append(" ");
            if (r.getTargetRole() != null) sb.append(r.getTargetRole()).append(" ");
            if (r.getSkills() != null) r.getSkills().forEach(s -> sb.append(s.getName()).append(" "));
            if (r.getExperience() != null) r.getExperience().forEach(e -> {
                sb.append(e.getTitle()).append(" ").append(e.getCompany()).append(" ")
                  .append(e.getResponsibilities()).append(" ").append(e.getAchievements()).append(" ");
            });
            if (r.getProjects() != null) r.getProjects().forEach(p -> {
                sb.append(p.getTitle()).append(" ").append(p.getTechnologies()).append(" ")
                  .append(p.getDescription()).append(" ").append(p.getHighlights()).append(" ");
            });
        } else if (resumeObj instanceof String str) {
            sb.append(str);
        }
        return sb.toString();
    }

    private List<String> extractSkillsFromResume(Object resumeObj) {
        List<String> list = new ArrayList<>();
        if (resumeObj instanceof Resume r && r.getSkills() != null) {
            r.getSkills().forEach(s -> list.add(s.getName()));
        } else if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r && r.getSkills() != null) {
            r.getSkills().forEach(s -> list.add(s.getName()));
        } else if (resumeObj instanceof ResumeRequest r && r.getSkills() != null) {
            r.getSkills().forEach(s -> list.add(s.getName()));
        }
        return list;
    }

    private int getExperienceCount(Object resumeObj) {
        if (resumeObj instanceof Resume r && r.getExperience() != null) return r.getExperience().size();
        if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r && r.getExperience() != null) return r.getExperience().size();
        if (resumeObj instanceof ResumeRequest r && r.getExperience() != null) return r.getExperience().size();
        return 1;
    }

    private int getProjectCount(Object resumeObj) {
        if (resumeObj instanceof Resume r && r.getProjects() != null) return r.getProjects().size();
        if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r && r.getProjects() != null) return r.getProjects().size();
        if (resumeObj instanceof ResumeRequest r && r.getProjects() != null) return r.getProjects().size();
        return 1;
    }

    private int getEducationCount(Object resumeObj) {
        if (resumeObj instanceof Resume r && r.getEducation() != null) return r.getEducation().size();
        if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r && r.getEducation() != null) return r.getEducation().size();
        if (resumeObj instanceof ResumeRequest r && r.getEducation() != null) return r.getEducation().size();
        return 1;
    }

    private int getCertificationCount(Object resumeObj) {
        if (resumeObj instanceof Resume r && r.getCertifications() != null) return r.getCertifications().size();
        if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r && r.getCertifications() != null) return r.getCertifications().size();
        if (resumeObj instanceof ResumeRequest r && r.getCertifications() != null) return r.getCertifications().size();
        return 0;
    }

    private boolean hasSummary(Object resumeObj) {
        if (resumeObj instanceof Resume r) return r.getSummary() != null && r.getSummary().trim().length() > 20;
        if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r) return r.getSummary() != null && r.getSummary().trim().length() > 20;
        if (resumeObj instanceof ResumeRequest r) return r.getSummary() != null && r.getSummary().trim().length() > 20;
        return false;
    }

    private boolean hasContactInfo(Object resumeObj) {
        if (resumeObj instanceof Resume r && r.getPersonalInformation() != null) {
            return r.getPersonalInformation().getEmail() != null && r.getPersonalInformation().getPhone() != null;
        }
        if (resumeObj instanceof com.resumeforge.dto.response.ResumeResponse r && r.getPersonalInformation() != null) {
            return r.getPersonalInformation().getEmail() != null && r.getPersonalInformation().getPhone() != null;
        }
        return true;
    }
}
