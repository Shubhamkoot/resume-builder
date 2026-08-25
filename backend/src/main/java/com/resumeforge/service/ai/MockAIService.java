package com.resumeforge.service.ai;

import com.resumeforge.dto.request.*;
import com.resumeforge.dto.response.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class MockAIService implements AIService {

    private static final Set<String> COMMON_LANGUAGES = Set.of("java", "python", "javascript", "typescript", "c++", "c#", "go", "golang", "ruby", "rust", "php", "swift", "kotlin", "scala", "sql", "html", "css");
    private static final Set<String> COMMON_FRAMEWORKS = Set.of("spring", "spring boot", "react", "react.js", "angular", "vue", "vue.js", "node.js", "express", "django", "flask", "fastapi", "next.js", "hibernate");
    private static final Set<String> COMMON_CLOUD = Set.of("aws", "amazon web services", "azure", "gcp", "google cloud", "ec2", "s3", "lambda", "ecs", "eks", "rds", "cloudformation");
    private static final Set<String> COMMON_DEVOPS = Set.of("docker", "kubernetes", "k8s", "jenkins", "gitlab ci", "github actions", "terraform", "ansible", "maven", "gradle", "linux", "git");
    private static final Set<String> COMMON_DATABASES = Set.of("mysql", "postgresql", "postgres", "mongodb", "redis", "oracle", "sql server", "dynamodb", "cassandra", "sqlite");
    private static final Set<String> COMMON_TOOLS = Set.of("jira", "postman", "intellij", "vscode", "kafka", "rabbitmq", "rest api", "graphql", "microservices");

    @Override
    public JobAnalysisResponse analyzeJobDescription(JobAnalyzeRequest request) {
        String text = (request.getJobDescription() + " " + (request.getJobTitle() != null ? request.getJobTitle() : "")).toLowerCase();

        JobAnalysisResponse resp = new JobAnalysisResponse();
        resp.setJobTitle(request.getJobTitle() != null ? request.getJobTitle() : "Software Engineer");
        resp.setCompanyName(request.getCompanyName() != null ? request.getCompanyName() : "Tech Company");

        List<String> required = new ArrayList<>();
        List<String> preferred = new ArrayList<>();
        List<String> langs = new ArrayList<>();
        List<String> fws = new ArrayList<>();
        List<String> cloud = new ArrayList<>();
        List<String> devops = new ArrayList<>();
        List<String> dbs = new ArrayList<>();
        List<String> tools = new ArrayList<>();
        List<String> keywords = new ArrayList<>();

        extractMatching(text, COMMON_LANGUAGES, langs);
        extractMatching(text, COMMON_FRAMEWORKS, fws);
        extractMatching(text, COMMON_CLOUD, cloud);
        extractMatching(text, COMMON_DEVOPS, devops);
        extractMatching(text, COMMON_DATABASES, dbs);
        extractMatching(text, COMMON_TOOLS, tools);

        if (langs.isEmpty() && fws.isEmpty()) {
            langs.addAll(List.of("Java", "SQL"));
            fws.addAll(List.of("Spring Boot", "REST APIs"));
        }

        // Separate required vs preferred
        for (String l : langs) { required.add(capitalizeWords(l)); }
        for (String f : fws) { required.add(capitalizeWords(f)); }
        for (String c : cloud) {
            if (required.size() < 6) required.add(c.toUpperCase());
            else preferred.add(c.toUpperCase());
        }
        for (String d : devops) {
            if (required.size() < 8) required.add(capitalizeWords(d));
            else preferred.add(capitalizeWords(d));
        }
        for (String db : dbs) { required.add(capitalizeWords(db)); }
        for (String t : tools) { preferred.add(capitalizeWords(t)); }

        // Experience extraction
        Pattern expPattern = Pattern.compile("(\\d+\\+?\\s*(?:to\\s*\\d+\\+?)?\\s*(?:years?|yrs?))", Pattern.CASE_INSENSITIVE);
        Matcher expMatcher = expPattern.matcher(text);
        if (expMatcher.find()) {
            resp.setExperienceRequirements(expMatcher.group(1) + " of software development experience");
        } else {
            resp.setExperienceRequirements("2+ years of relevant industry experience");
        }

        // Education extraction
        if (text.contains("bachelor") || text.contains("bs") || text.contains("b.tech") || text.contains("b.e")) {
            resp.setEducationRequirements("Bachelor's degree in Computer Science, Engineering, or related field");
        } else if (text.contains("master") || text.contains("ms")) {
            resp.setEducationRequirements("Master's or Bachelor's degree in Computer Science or related field");
        } else {
            resp.setEducationRequirements("Degree in Computer Science or equivalent practical experience");
        }

        resp.setProgrammingLanguages(langs.stream().map(this::capitalizeWords).collect(Collectors.toList()));
        resp.setFrameworks(fws.stream().map(this::capitalizeWords).collect(Collectors.toList()));
        resp.setCloudTechnologies(cloud.stream().map(String::toUpperCase).collect(Collectors.toList()));
        resp.setDevOpsTechnologies(devops.stream().map(this::capitalizeWords).collect(Collectors.toList()));
        resp.setDatabases(dbs.stream().map(this::capitalizeWords).collect(Collectors.toList()));
        resp.setTools(tools.stream().map(this::capitalizeWords).collect(Collectors.toList()));
        resp.setRequiredSkills(required.stream().distinct().limit(10).collect(Collectors.toList()));
        resp.setPreferredSkills(preferred.stream().distinct().limit(6).collect(Collectors.toList()));

        resp.setSoftSkills(List.of("Problem Solving", "Agile Collaboration", "Strong Communication", "Analytical Thinking"));
        resp.setResponsibilities(List.of(
                "Design and develop scalable, high-performance software components and RESTful microservices.",
                "Collaborate with cross-functional teams, product managers, and UI designers to ship robust features.",
                "Write comprehensive unit/integration tests and participate in active peer code reviews.",
                "Identify bottlenecks, optimize database queries, and improve overall system reliability."
        ));

        keywords.addAll(resp.getRequiredSkills());
        keywords.addAll(resp.getPreferredSkills());
        keywords.addAll(List.of("Scalability", "Microservices", "RESTful APIs", "CI/CD", "Clean Architecture"));
        resp.setImportantKeywords(keywords.stream().distinct().limit(12).collect(Collectors.toList()));

        return resp;
    }

    @Override
    public ResumeResponse generateTailoredResume(ResumeResponse baseResume, String jobTitle, String companyName, String jobDescription) {
        JobAnalyzeRequest req = new JobAnalyzeRequest();
        req.setJobTitle(jobTitle);
        req.setCompanyName(companyName);
        req.setJobDescription(jobDescription);
        JobAnalysisResponse jd = analyzeJobDescription(req);

        ResumeResponse tailored = new ResumeResponse();
        tailored.setUserId(baseResume.getUserId());
        tailored.setTitle((jobTitle != null && !jobTitle.isEmpty() ? jobTitle : "Tailored") + " Resume (" + (companyName != null ? companyName : "Optimized") + ")");
        tailored.setTargetRole(jobTitle != null ? jobTitle : baseResume.getTargetRole());
        tailored.setTargetCompany(companyName != null ? companyName : baseResume.getTargetCompany());
        tailored.setTemplate(baseResume.getTemplate() != null ? baseResume.getTemplate() : "ATS_CLASSIC");
        tailored.setSectionOrder(baseResume.getSectionOrder());
        tailored.setIsAiGenerated(true);

        // Copy personal information exactly
        tailored.setPersonalInformation(baseResume.getPersonalInformation());

        // Tailor summary to target role and company without inventing facts
        String candidateName = baseResume.getPersonalInformation() != null ? baseResume.getPersonalInformation().getFullName() : "Candidate";
        String originalSummary = baseResume.getSummary();
        String targetRoleName = jobTitle != null ? jobTitle : (baseResume.getTargetRole() != null ? baseResume.getTargetRole() : "Software Professional");

        String tailoredSummary;
        if (originalSummary != null && !originalSummary.isBlank()) {
            tailoredSummary = originalSummary.replaceAll("(?i)seeking a.*", "")
                    + " Results-driven " + targetRoleName + " skilled in architecting scalable solutions and delivering high-performance software aligned with " + (companyName != null ? companyName : "target business") + " engineering goals.";
        } else {
            tailoredSummary = "Dedicated and detail-oriented " + targetRoleName + " with a proven track record of developing robust, high-performance applications and collaborating across agile teams to deliver production-grade software.";
        }
        tailored.setSummary(tailoredSummary.trim());

        // Prioritize existing skills matching JD keywords
        List<SkillDto> skills = new ArrayList<>();
        if (baseResume.getSkills() != null) {
            Set<String> jdSkills = new HashSet<>(jd.getRequiredSkills().stream().map(String::toLowerCase).collect(Collectors.toSet()));
            List<SkillDto> matched = new ArrayList<>();
            List<SkillDto> other = new ArrayList<>();

            for (SkillDto s : baseResume.getSkills()) {
                if (jdSkills.contains(s.getName().toLowerCase())) {
                    matched.add(s);
                } else {
                    other.add(s);
                }
            }
            skills.addAll(matched);
            skills.addAll(other);
        }
        tailored.setSkills(skills);

        // Optimize experience bullet points (Action Verbs + STAR phrasing, strictly without inventing new companies or roles)
        List<ExperienceDto> expList = new ArrayList<>();
        if (baseResume.getExperience() != null) {
            for (ExperienceDto origExp : baseResume.getExperience()) {
                ExperienceDto optimizedExp = new ExperienceDto();
                optimizedExp.setId(origExp.getId());
                optimizedExp.setCompany(origExp.getCompany());
                optimizedExp.setTitle(origExp.getTitle());
                optimizedExp.setLocation(origExp.getLocation());
                optimizedExp.setStartDate(origExp.getStartDate());
                optimizedExp.setEndDate(origExp.getEndDate());
                optimizedExp.setIsCurrent(origExp.getIsCurrent());
                optimizedExp.setSortOrder(origExp.getSortOrder());

                String resp = origExp.getResponsibilities();
                if (resp != null && !resp.isBlank()) {
                    String[] bullets = resp.split("\n");
                    StringBuilder optimizedResp = new StringBuilder();
                    for (String b : bullets) {
                        String clean = b.replaceAll("^[•\\-*\\s]+", "").trim();
                        if (clean.isEmpty()) continue;
                        if (!clean.matches("^(Architected|Engineered|Spearheaded|Implemented|Developed|Optimized|Accelerated|Automated).*")) {
                            clean = "Engineered and enhanced " + clean.substring(0, 1).toLowerCase() + clean.substring(1);
                        }
                        if (!clean.endsWith(".")) clean += ".";
                        optimizedResp.append("• ").append(clean).append("\n");
                    }
                    optimizedExp.setResponsibilities(optimizedResp.toString().trim());
                } else {
                    optimizedExp.setResponsibilities(origExp.getResponsibilities());
                }
                optimizedExp.setAchievements(origExp.getAchievements());
                expList.add(optimizedExp);
            }
        }
        tailored.setExperience(expList);

        // Copy and preserve projects, education, certs, achievements, languages, social links
        tailored.setProjects(baseResume.getProjects());
        tailored.setEducation(baseResume.getEducation());
        tailored.setCertifications(baseResume.getCertifications());
        tailored.setAchievements(baseResume.getAchievements());
        tailored.setLanguages(baseResume.getLanguages());
        tailored.setSocialLinks(baseResume.getSocialLinks());

        return tailored;
    }

    @Override
    public AIImproveResponse improveContent(AIImproveRequest request) {
        String type = request.getType() != null ? request.getType().toUpperCase() : "GENERAL";
        String original = request.getText() != null ? request.getText().trim() : "";

        String improved;
        List<String> changes = new ArrayList<>();
        String rationale;

        switch (type) {
            case "SUMMARY" -> {
                improved = "Accomplished and growth-focused " + (request.getTargetJobTitle() != null ? request.getTargetJobTitle() : "Software Professional") +
                        " with strong expertise in full-stack architecture, clean code principles, and scalable system design. Proven track record of delivering resilient, high-availability microservices and optimizing application throughput by 40%. Collaborative team player dedicated to engineering excellence.";
                changes.add("Replaced generic statements with strong action-oriented value propositions");
                changes.add("Added quantifiable impact markers (e.g. 40% performance gain)");
                changes.add("Aligned core competencies with target industry expectations");
                rationale = "Creates an immediate hook for recruiters and ATS scanners by showcasing domain authority.";
            }
            case "EXPERIENCE", "ACHIEVEMENTS" -> {
                if (original.contains("\n") || original.startsWith("•") || original.startsWith("-")) {
                    String[] lines = original.split("\n");
                    StringBuilder sb = new StringBuilder();
                    for (String line : lines) {
                        String clean = line.replaceAll("^[•\\-*\\s]+", "").trim();
                        if (clean.isEmpty()) continue;
                        sb.append("• Spearheaded ").append(clean.substring(0, 1).toLowerCase()).append(clean.substring(1));
                        if (!clean.contains("%") && !clean.contains("ms")) {
                            sb.append(", enhancing system throughput by 32% and reducing deployment downtime.");
                        } else {
                            sb.append(".");
                        }
                        sb.append("\n");
                    }
                    improved = sb.toString().trim();
                } else {
                    improved = "• Architected and deployed scalable backend services, resulting in a 35% reduction in API latency.\n" +
                            "• Collaborated with cross-functional engineering teams to implement continuous integration pipelines, cutting release cycles from 2 weeks to 2 days.\n" +
                            "• Refactored mission-critical modules to boost code coverage from 60% to 92%.";
                }
                changes.add("Converted passive descriptions to Google X-Y-Z formula (Accomplished [X] as measured by [Y], by doing [Z])");
                changes.add("Injected strong action verbs (Architected, Spearheaded, Refactored)");
                rationale = "Quantifiable bullets drastically boost ATS ranking and recruiter engagement.";
            }
            case "PROJECT" -> {
                improved = "Architected a comprehensive end-to-end full-stack platform incorporating modern architectural patterns, automated CI/CD deployment pipelines, and responsive UI components. Handled real-time data synchronization with sub-100ms response times.";
                changes.add("Clarified architectural scope and technical depth");
                changes.add("Highlighted latency, scalability, and deployment readiness");
                rationale = "Emphasizes engineering rigor and production-ready implementation.";
            }
            case "CONCISE" -> {
                improved = original.replaceAll("(?i)responsible for (the )?", "Led ")
                        .replaceAll("(?i)worked on", "Engineered")
                        .replaceAll("(?i)helped in", "Contributed to")
                        .replaceAll("\\s{2,}", " ");
                changes.add("Eliminated filler words and redundancies");
                changes.add("Tightened phrasing for maximum punch per word");
                rationale = "Enhances scannability for fast 6-second recruiter reviews.";
            }
            default -> {
                improved = "Engineered and optimized " + original;
                changes.add("Enhanced vocabulary and technical tone");
                rationale = "Improved professional polish.";
            }
        }

        AIImproveResponse resp = new AIImproveResponse(type, original, improved, rationale);
        resp.setChangesMade(changes);
        return resp;
    }

    private void extractMatching(String text, Set<String> candidates, List<String> result) {
        for (String c : candidates) {
            String pattern = "\\b" + Pattern.quote(c) + "\\b";
            if (Pattern.compile(pattern, Pattern.CASE_INSENSITIVE).matcher(text).find()) {
                result.add(c);
            }
        }
    }

    private String capitalizeWords(String str) {
        if (str == null || str.isEmpty()) return str;
        String[] words = str.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            if (w.length() > 0) {
                sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1).toLowerCase()).append(" ");
            }
        }
        return sb.toString().trim();
    }
}
