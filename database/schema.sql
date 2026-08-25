-- AI ResumeForge Database Schema (MySQL 8+)
CREATE DATABASE IF NOT EXISTS resumeforge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE resumeforge;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ROLE_USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
    target_role VARCHAR(255),
    target_company VARCHAR(255),
    template VARCHAR(50) DEFAULT 'ATS_CLASSIC',
    summary TEXT,
    section_order TEXT,
    ats_score INT DEFAULT 0,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_resume_user (user_id)
) ENGINE=InnoDB;

-- Personal Information Table
CREATE TABLE IF NOT EXISTS personal_information (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    full_name VARCHAR(255),
    professional_title VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    portfolio VARCHAR(255),
    photo_url VARCHAR(500),
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    INDEX idx_pi_resume (resume_id)
) ENGINE=InnoDB;

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Technical',
    proficiency_level VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    INDEX idx_skill_resume (resume_id)
) ENGINE=InnoDB;

-- Education Table
CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    location VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    grade VARCHAR(50),
    description TEXT,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    INDEX idx_edu_resume (resume_id)
) ENGINE=InnoDB;

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    company VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    is_current BOOLEAN DEFAULT FALSE,
    responsibilities TEXT,
    achievements TEXT,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    INDEX idx_exp_resume (resume_id)
) ENGINE=InnoDB;

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies VARCHAR(500),
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    highlights TEXT,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    INDEX idx_proj_resume (resume_id)
) ENGINE=InnoDB;

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issue_date VARCHAR(50),
    expiration_date VARCHAR(50),
    credential_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Languages Table
CREATE TABLE IF NOT EXISTS languages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Resume Versions Table
CREATE TABLE IF NOT EXISTS resume_versions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    version_number INT NOT NULL DEFAULT 1,
    version_name VARCHAR(255),
    resume_data_json LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Job Descriptions Analyzed
CREATE TABLE IF NOT EXISTS job_descriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    raw_text LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Job Applications Table (Tracker)
CREATE TABLE IF NOT EXISTS job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    resume_id BIGINT,
    company VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    application_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED',
    notes TEXT,
    salary VARCHAR(100),
    location VARCHAR(255),
    job_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    description TEXT,
    entity_type VARCHAR(50),
    entity_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_act_user (user_id)
) ENGINE=InnoDB;
