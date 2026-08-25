package com.resumeforge.config;

import com.resumeforge.dto.request.*;
import com.resumeforge.entity.JobApplication;
import com.resumeforge.entity.Resume;
import com.resumeforge.entity.User;
import com.resumeforge.repository.JobApplicationRepository;
import com.resumeforge.repository.UserRepository;
import com.resumeforge.service.ResumeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ResumeService resumeService;
    private final JobApplicationRepository jobApplicationRepository;

    public DataInitializer(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           ResumeService resumeService,
                           JobApplicationRepository jobApplicationRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.resumeService = resumeService;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.existsByEmail("john@example.com")) {
            return;
        }

        // 1. Create Demo User
        User user = new User();
        user.setFullName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        user.setRole("ROLE_USER");
        User savedUser = userRepository.save(user);

        // 2. Create Master Resume for John Doe
        ResumeRequest master = new ResumeRequest();
        master.setTitle("Java Full-Stack Developer Resume");
        master.setTargetRole("Senior Java Developer");
        master.setTargetCompany("Enterprise Tech");
        master.setTemplate("ATS_CLASSIC");
        master.setSectionOrder("summary,skills,experience,projects,education,certifications,achievements,languages");
        master.setSummary("Results-driven Senior Java Developer with 5+ years of experience architecting resilient microservices, high-throughput REST APIs, and modern React frontends. Proficient in Spring Boot, MySQL, AWS cloud deployments, and CI/CD pipelines. Passionate about clean architecture and scalable distributed systems.");

        PersonalInfoDto pi = new PersonalInfoDto();
        pi.setFullName("John Doe");
        pi.setProfessionalTitle("Senior Java Developer");
        pi.setEmail("john.doe@example.com");
        pi.setPhone("+1 (555) 234-5678");
        pi.setLocation("San Francisco, CA");
        pi.setLinkedin("linkedin.com/in/johndoe-dev");
        pi.setGithub("github.com/johndoe");
        pi.setPortfolio("johndoe.dev");
        master.setPersonalInformation(pi);

        master.setSkills(List.of(
                new SkillDto("Java 17/21", "Programming Languages"),
                new SkillDto("JavaScript / TypeScript", "Programming Languages"),
                new SkillDto("SQL", "Programming Languages"),
                new SkillDto("Spring Boot", "Frameworks"),
                new SkillDto("Spring Data JPA", "Frameworks"),
                new SkillDto("Spring Security", "Frameworks"),
                new SkillDto("React.js", "Frameworks"),
                new SkillDto("MySQL", "Databases"),
                new SkillDto("PostgreSQL", "Databases"),
                new SkillDto("Redis", "Databases"),
                new SkillDto("AWS (EC2, S3, RDS)", "Cloud"),
                new SkillDto("Docker", "DevOps"),
                new SkillDto("Git & GitHub Actions", "DevOps"),
                new SkillDto("Maven", "DevOps"),
                new SkillDto("RESTful APIs", "Tools"),
                new SkillDto("Microservices Architecture", "Tools"),
                new SkillDto("Agile / Scrum Collaboration", "Soft Skills")
        ));

        ExperienceDto exp1 = new ExperienceDto();
        exp1.setCompany("Apex Cloud Solutions");
        exp1.setTitle("Senior Software Engineer");
        exp1.setLocation("San Francisco, CA");
        exp1.setStartDate("2022-03");
        exp1.setIsCurrent(true);
        exp1.setResponsibilities("• Architected and deployed 8+ core Spring Boot microservices handling over 2M daily API requests with 99.99% uptime.\n" +
                "• Optimized SQL queries and integrated Redis caching, cutting average database response times by 42%.\n" +
                "• Designed and implemented containerized CI/CD pipelines using Docker and GitHub Actions, slashing release deployment cycles from 2 weeks to 25 minutes.\n" +
                "• Mentored 4 junior engineers on clean code, test-driven development, and Spring Security best practices.");
        exp1.setAchievements("Awarded Engineer of the Quarter in Q3 2023 for leading the zero-downtime database migration.");

        ExperienceDto exp2 = new ExperienceDto();
        exp2.setCompany("NextGen Digital Systems");
        exp2.setTitle("Software Engineer");
        exp2.setLocation("San Jose, CA");
        exp2.setStartDate("2019-06");
        exp2.setEndDate("2022-02");
        exp2.setIsCurrent(false);
        exp2.setResponsibilities("• Developed RESTful backend endpoints in Java Spring Boot integrated with MySQL and React frontend components.\n" +
                "• Implemented JWT token authentication and role-based access control protecting customer data for 50,000+ active users.\n" +
                "• Authored comprehensive JUnit 5 and Mockito test suites, improving unit test coverage across the repository from 55% to 88%.");

        master.setExperience(List.of(exp1, exp2));

        ProjectDto proj1 = new ProjectDto();
        proj1.setTitle("AI ResumeForge — Career Platform");
        proj1.setTechnologies("Java, Spring Boot, React, MySQL, Docker, AWS");
        proj1.setDescription("Architected full-stack ATS resume builder and job matching engine featuring deterministic scoring and server-side PDF/DOCX generation.");
        proj1.setHighlights("• Handled sub-200ms text analysis and PDF rendering with zero external licensing cost.\n• Implemented secure JWT stateless authentication with Spring Security.");
        proj1.setProjectUrl("https://resumeforge.demo.app");
        proj1.setGithubUrl("https://github.com/johndoe/resume-forge");

        ProjectDto proj2 = new ProjectDto();
        proj2.setTitle("Distributed Task Queue & Scheduler");
        proj2.setTechnologies("Java, Spring Boot, Redis, MySQL, Docker");
        proj2.setDescription("Engineered high-throughput asynchronous job execution system capable of processing 10,000 concurrent background worker tasks.");
        proj2.setHighlights("• Integrated Redis pub/sub for real-time state broadcast and heartbeat monitoring.");

        master.setProjects(List.of(proj1, proj2));

        EducationDto edu = new EducationDto();
        edu.setInstitution("University of California, Berkeley");
        edu.setDegree("Bachelor of Science");
        edu.setFieldOfStudy("Computer Science");
        edu.setLocation("Berkeley, CA");
        edu.setStartDate("2015");
        edu.setEndDate("2019");
        edu.setGrade("3.85 GPA");
        edu.setDescription("Dean's Honor List, coursework in Distributed Systems, Algorithms, and Cloud Computing.");
        master.setEducation(List.of(edu));

        CertificationDto cert1 = new CertificationDto();
        cert1.setName("AWS Certified Solutions Architect – Associate");
        cert1.setIssuer("Amazon Web Services");
        cert1.setIssueDate("2023");
        cert1.setCredentialUrl("https://aws.amazon.com/verification");

        CertificationDto cert2 = new CertificationDto();
        cert2.setName("Oracle Certified Professional: Java SE 17 Developer");
        cert2.setIssuer("Oracle");
        cert2.setIssueDate("2022");

        master.setCertifications(List.of(cert1, cert2));

        AchievementDto ach1 = new AchievementDto();
        ach1.setTitle("1st Place Winner — Silicon Valley Hackathon 2023");
        ach1.setDescription("Built real-time AI document parser within 36 hours competing against 80+ engineering teams.");
        master.setAchievements(List.of(ach1));

        master.setLanguages(List.of(
                new LanguageDto() {{ setName("English"); setProficiency("Native"); }},
                new LanguageDto() {{ setName("Spanish"); setProficiency("Professional Working"); }}
        ));

        master.setSocialLinks(List.of(
                new SocialLinkDto("LinkedIn", "https://linkedin.com/in/johndoe-dev"),
                new SocialLinkDto("GitHub", "https://github.com/johndoe"),
                new SocialLinkDto("Portfolio", "https://johndoe.dev")
        ));

        var createdMaster = resumeService.createResume(master, savedUser.getId());

        // 3. Create Sample Job Applications
        JobApplication app1 = new JobApplication();
        app1.setUser(savedUser);
        app1.setCompany("Stripe");
        app1.setJobTitle("Senior Backend Engineer");
        app1.setStatus("INTERVIEW");
        app1.setApplicationDate(LocalDate.now().minusDays(5));
        app1.setSalary("$175,000 - $210,000");
        app1.setLocation("Remote, US");
        app1.setNotes("Completed technical phone screen. System Design round scheduled for next Tuesday.");
        app1.setJobUrl("https://stripe.com/jobs/senior-backend-engineer");

        JobApplication app2 = new JobApplication();
        app2.setUser(savedUser);
        app2.setCompany("Amazon Web Services");
        app2.setJobTitle("Cloud Software Development Engineer II");
        app2.setStatus("ASSESSMENT");
        app2.setApplicationDate(LocalDate.now().minusDays(10));
        app2.setSalary("$160,000 - $190,000");
        app2.setLocation("Seattle, WA");
        app2.setNotes("Online coding assessment submitted.");

        JobApplication app3 = new JobApplication();
        app3.setUser(savedUser);
        app3.setCompany("Datadog");
        app3.setJobTitle("Java Platform Engineer");
        app3.setStatus("APPLIED");
        app3.setApplicationDate(LocalDate.now().minusDays(2));
        app3.setSalary("$170,000 - $200,000");
        app3.setLocation("San Francisco, CA");

        jobApplicationRepository.saveAll(List.of(app1, app2, app3));
    }
}
