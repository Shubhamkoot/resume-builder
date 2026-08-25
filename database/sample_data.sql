-- AI ResumeForge Sample Seed Data (Password is 'password123')
USE resumeforge;

INSERT INTO users (id, full_name, email, password, role) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$e8p1O/j6rV9lYfN0fXbC3epVq5ZJ74i7P7wW5M8t0I2jB3wH6Wz6i', 'ROLE_USER');

INSERT INTO resumes (id, user_id, title, target_role, target_company, template, summary, section_order, ats_score, is_ai_generated) VALUES
(1, 1, 'Java Full-Stack Developer Resume', 'Senior Java Developer', 'Enterprise Tech', 'ATS_CLASSIC',
 'Results-driven Senior Java Developer with 5+ years of experience architecting resilient microservices, high-throughput REST APIs, and modern React frontends. Proficient in Spring Boot, MySQL, AWS cloud deployments, and CI/CD pipelines. Passionate about clean architecture and scalable distributed systems.',
 'summary,skills,experience,projects,education,certifications,achievements,languages', 92, FALSE);

INSERT INTO personal_information (resume_id, full_name, professional_title, email, phone, location, linkedin, github, portfolio) VALUES
(1, 'John Doe', 'Senior Java Developer', 'john.doe@example.com', '+1 (555) 234-5678', 'San Francisco, CA', 'linkedin.com/in/johndoe-dev', 'github.com/johndoe', 'johndoe.dev');

INSERT INTO skills (resume_id, name, category, proficiency_level, sort_order) VALUES
(1, 'Java 17/21', 'Programming Languages', 'Expert', 1),
(1, 'SQL', 'Programming Languages', 'Advanced', 2),
(1, 'Spring Boot', 'Frameworks', 'Expert', 3),
(1, 'Spring Data JPA', 'Frameworks', 'Advanced', 4),
(1, 'Spring Security', 'Frameworks', 'Advanced', 5),
(1, 'React.js', 'Frameworks', 'Intermediate', 6),
(1, 'MySQL', 'Databases', 'Advanced', 7),
(1, 'AWS (EC2, S3, RDS)', 'Cloud', 'Advanced', 8),
(1, 'Docker', 'DevOps', 'Advanced', 9),
(1, 'Git & GitHub Actions', 'DevOps', 'Advanced', 10),
(1, 'RESTful APIs', 'Tools', 'Expert', 11);

INSERT INTO experience (resume_id, company, title, location, start_date, end_date, is_current, responsibilities, achievements, sort_order) VALUES
(1, 'Apex Cloud Solutions', 'Senior Software Engineer', 'San Francisco, CA', '2022-03', NULL, TRUE,
 '• Architected and deployed 8+ core Spring Boot microservices handling over 2M daily API requests with 99.99% uptime.\n• Optimized SQL queries and integrated Redis caching, cutting average database response times by 42%.\n• Designed and implemented containerized CI/CD pipelines using Docker and GitHub Actions, slashing release cycles from 2 weeks to 25 minutes.\n• Mentored 4 junior engineers on clean code and Spring Security best practices.',
 'Awarded Engineer of the Quarter in Q3 2023 for leading the zero-downtime database migration.', 1),
(1, 'NextGen Digital Systems', 'Software Engineer', 'San Jose, CA', '2019-06', '2022-02', FALSE,
 '• Developed RESTful backend endpoints in Java Spring Boot integrated with MySQL and React frontend components.\n• Implemented JWT token authentication and role-based access control protecting customer data for 50,000+ active users.\n• Authored comprehensive JUnit 5 and Mockito test suites, improving unit test coverage from 55% to 88%.',
 NULL, 2);

INSERT INTO projects (resume_id, title, description, technologies, project_url, github_url, highlights, sort_order) VALUES
(1, 'AI ResumeForge — Career Platform', 'Architected full-stack ATS resume builder and job matching engine featuring deterministic scoring and server-side PDF/DOCX generation.', 'Java, Spring Boot, React, MySQL, Docker, AWS', 'https://resumeforge.demo.app', 'https://github.com/johndoe/resume-forge', '• Handled sub-200ms text analysis and PDF rendering with zero external licensing cost.\n• Implemented secure JWT stateless authentication with Spring Security.', 1),
(1, 'Distributed Task Queue & Scheduler', 'Engineered high-throughput asynchronous job execution system capable of processing 10,000 concurrent background worker tasks.', 'Java, Spring Boot, Redis, MySQL, Docker', NULL, NULL, '• Integrated Redis pub/sub for real-time state broadcast and heartbeat monitoring.', 2);

INSERT INTO education (resume_id, institution, degree, field_of_study, location, start_date, end_date, grade, description, sort_order) VALUES
(1, 'University of California, Berkeley', 'Bachelor of Science', 'Computer Science', 'Berkeley, CA', '2015', '2019', '3.85 GPA', 'Dean''s Honor List, coursework in Distributed Systems, Algorithms, and Cloud Computing.', 1);

INSERT INTO certifications (resume_id, name, issuer, issue_date, credential_url, sort_order) VALUES
(1, 'AWS Certified Solutions Architect – Associate', 'Amazon Web Services', '2023', 'https://aws.amazon.com/verification', 1),
(1, 'Oracle Certified Professional: Java SE 17 Developer', 'Oracle', '2022', NULL, 2);

INSERT INTO achievements (resume_id, title, description, sort_order) VALUES
(1, '1st Place Winner — Silicon Valley Hackathon 2023', 'Built real-time AI document parser within 36 hours competing against 80+ engineering teams.', 1);

INSERT INTO languages (resume_id, name, proficiency, sort_order) VALUES
(1, 'English', 'Native', 1),
(1, 'Spanish', 'Professional Working', 2);

INSERT INTO social_links (resume_id, platform, url, sort_order) VALUES
(1, 'LinkedIn', 'https://linkedin.com/in/johndoe-dev', 1),
(1, 'GitHub', 'https://github.com/johndoe', 2),
(1, 'Portfolio', 'https://johndoe.dev', 3);

INSERT INTO job_applications (user_id, resume_id, company, job_title, status, application_date, salary, location, notes, job_url) VALUES
(1, 1, 'Stripe', 'Senior Backend Engineer', 'INTERVIEW', '2026-08-19', '$175,000 - $210,000', 'Remote, US', 'System Design round scheduled for next Tuesday.', 'https://stripe.com/jobs/senior-backend-engineer'),
(1, 1, 'Amazon Web Services', 'Cloud Software Development Engineer II', 'ASSESSMENT', '2026-08-14', '$160,000 - $190,000', 'Seattle, WA', 'Online coding assessment submitted.', NULL),
(1, 1, 'Datadog', 'Java Platform Engineer', 'APPLIED', '2026-08-22', '$170,000 - $200,000', 'San Francisco, CA', NULL, NULL);
