# AI ResumeForge — AI-Powered Resume Builder & Job Matcher

> **"Build manually. Optimize with AI. Get hired."**

![AI ResumeForge](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)
![Java](https://img.shields.io/badge/Java-17%20%7C%2021-orange.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)
![Packaging](https://img.shields.io/badge/Packaging-WAR-blueviolet.svg)
![Deployment](https://img.shields.io/badge/Deployment-Apache%20Tomcat%20%2F%20AWS%20EC2-orange.svg)

---

## 🌟 Executive Overview

**AI ResumeForge** is an enterprise-grade full-stack web application designed for software engineers, technical recruiters, and career professionals to create, analyze, and optimize ATS-friendly resumes. It features a deterministic 100-point ATS scoring engine, 6 recruiter-tested templates, server-side PDF and DOCX generation, and configurable AI integration that **strictly prevents hallucinations by never inventing fake experience**.

---

## 🏗️ Architecture & Technology Stack

```
                                  AI ResumeForge Architecture
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │                                    CLIENT LAYER                                        │
  │     React 18  •  Vite  •  Tailwind CSS  •  Lucide Icons  •  React Router  •  Axios     │
  └──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                             │ HTTP REST / JWT Bearer
  ┌──────────────────────────────────────────▼─────────────────────────────────────────────┐
  │                                BACKEND (SPRING BOOT 3)                                 │
  │                                                                                        │
  │   ┌─────────────────────┐   ┌──────────────────────────┐   ┌────────────────────────┐  │
  │   │  Spring Security    │   │  REST Controllers        │   │  Global Exception      │  │
  │   │  (JWT + BCrypt)     │   │  (/api/resumes, /ai,...) │   │  Handler               │  │
  │   └──────────┬──────────┘   └────────────┬─────────────┘   └────────────────────────┘  │
  │              │                           │                                             │
  │   ┌──────────▼───────────────────────────▼──────────────────────────────────────────┐  │
  │   │                          Service & Domain Layer                                 │  │
  │   │  • ResumeService (Ownership, Snapshots) • ATSScoringService (Deterministic 100pt)│  │
  │   │  • AIService (OpenAI / Gemini / Groq)   • PDFGenerationService (OpenPDF 6 Tpls) │  │
  │   │  • DOCXGenerationService (Apache POI)   • ResumeParserService (PDFBox & POI)   │  │
  │   └──────────┬───────────────────────────────────────────┬──────────────────────────┘  │
  │              │ Spring Data JPA                           │ HTTPS REST                  │
  │   ┌──────────▼──────────┐                     ┌──────────▼──────────┐                  │
  │   │   MySQL 8.0 / H2    │                     │  Configurable LLM   │                  │
  │   │   Relational Store  │                     │  (OpenAI, Groq,...) │                  │
  │   └─────────────────────┘                     └─────────────────────┘                  │
  └────────────────────────────────────────────────────────────────────────────────────────┘
```

### Backend:
- **Java 17+ / Java 21**
- **Spring Boot 3.2.5** (Spring MVC, Spring Data JPA, Spring Security)
- **JWT (jjwt 0.12.5)** & **BCrypt** password hashing
- **OpenPDF 1.3.39** (Native vector PDF document rendering)
- **Apache POI 5.2.5** (Native DOCX Word processing)
- **Apache PDFBox 2.0.31** (PDF text extraction)
- **Maven** (Configured with `SpringBootServletInitializer` producing `resume-forge.war` for Tomcat)

### Frontend:
- **React.js 18**
- **Vite** fast build tool
- **Tailwind CSS 3.4** (Responsive SaaS dashboard UI)
- **Lucide Icons**
- **Axios** with automatic JWT interceptors

### Database:
- **MySQL 8.0+** (Production) / **H2 Database** (Zero-setup Dev fallback)

---

## 🎯 Key Application Modes

### Mode 1 — Manual Multi-Step Resume Builder
- 13-step guided builder covering Personal Information, Summary, Skills, Experience, Projects, Education, Certifications, Achievements, Languages, Social Links, Template Selection, Section Reordering, and Final Preview.
- **Real-Time Live Split-Screen Preview**: See layout and typography changes instantly as you type.
- **Section Reordering**: Drag-and-drop or move sections up/down; generated PDFs strictly respect your custom section order.

### Mode 2 — AI Job Description Resume Builder
- Paste any target Job Title, Company, and Job Description.
- **Requirement Extraction**: Parses required vs. preferred skills, cloud platforms, databases, and keywords.
- **Deterministic 100-Point ATS Matching**: Transparent scoring without arbitrary LLM hallucinations.
- **Skill Gap Diagnostics**: Displays Matched Skills (✓), Missing Skills (⚠), and Weak/Partial matches (◐) with explanations.
- **1-Click Tailored Resume**: Optimizes summaries and experience bullet points using STAR format while **never inventing fake companies or technologies**.

### Side-by-Side AI Content Assistant
- "Improve Summary", "Improve Experience", "Optimize Skills", "Make ATS Friendly", "Make More Concise", "Generate Achievement Bullets".
- Interactive diff viewer displaying Original vs. AI Suggested with **[Accept]** and **[Reject]** buttons.

### ATS Resume File Analyzer
- Upload PDF or Word DOCX resumes to extract text and analyze keyword density, active verbs, and structure.

### Job Application Pipeline Tracker
- Kanban board workflow: `Saved` → `Applied` → `Assessment` → `Interview` → `Selected` → `Rejected`.

---

## 📊 Deterministic ATS Scoring Breakdown (100 Points Total)

| Scoring Category | Max Points | Evaluation Criteria |
| :--- | :--- | :--- |
| **Skills Match** | 30 Points | Exact and categorized match against required & preferred JD skills |
| **Keyword Match** | 20 Points | Domain keywords found across work experience and projects |
| **Experience Match** | 20 Points | Relevant years of experience and quantifiable STAR metrics (%) |
| **Education Match** | 10 Points | Degree level and field of study alignment |
| **Project Relevance** | 10 Points | Practical implementation of required technologies |
| **Certifications** | 5 Points | Cloud / vendor certifications |
| **Resume Structure** | 5 Points | Contact information, formatting, and header completeness |

---

## 🎨 6 Professional ATS-Optimized Templates

1. **ATS Classic**: Single-column, timeless typography, 100% ATS parser compliant.
2. **Modern Professional**: Navy header accents, structured grid competencies.
3. **Software Engineer**: Emphasizes tech stacks, code tags, and GitHub repositories.
4. **Cloud & DevOps**: Infrastructure highlights, AWS/Docker/Kubernetes prominence.
5. **Minimal**: Elegant whitespace, modern typographic hierarchy.
6. **Fresher / Graduate**: Prioritizes degrees, coursework, hackathons, and projects.

---

## 🚀 Getting Started Locally

### Prerequisites:
- Java 17 or higher (`java -version`)
- Node.js 18+ and npm (`node -v`)
- (Optional) MySQL 8.0 (The app automatically defaults to in-memory H2 with sample demo data if MySQL is not configured)

### 1. Run Backend:
```bash
cd backend

# On Linux/macOS
./mvnw spring-boot:run

# On Windows (or standard Maven)
mvn spring-boot:run
```
The Spring Boot backend will start on `http://localhost:8080`.

### 2. Run Frontend:
```bash
cd frontend

npm install
npm run dev
```
The React frontend will be available at `http://localhost:5173`.

### 3. Demo Credentials:
- **Email**: `john@example.com`
- **Password**: `password123`
*(Pre-loaded with realistic Senior Java Developer resume & application pipeline)*

---

## 📦 Building WAR for Apache Tomcat

The backend is configured to package directly as a standard Java EE Web Archive (`WAR`):

```bash
cd backend
mvn clean package -DskipTests
```
This generates `target/resume-forge.war`.

### Deploying to Apache Tomcat:
1. Copy `resume-forge.war` to `$CATALINA_HOME/webapps/ROOT.war`.
2. Configure environment variables in `$CATALINA_HOME/bin/setenv.sh`.
3. Start Tomcat: `$CATALINA_HOME/bin/startup.sh`.

---

## 🌐 AWS EC2 Production Deployment

See our comprehensive guide in [aws-ec2-deployment.md](file:///deployment/aws-ec2-deployment.md) for full Linux commands, security group configurations, MySQL setup, and systemd service setup.

---

## 🐳 Docker Deployment

```bash
docker-compose -f deployment/docker-compose.yml up --build -d
```

---

## 📄 License
MIT License. Built for production demonstration and portfolio excellence.
