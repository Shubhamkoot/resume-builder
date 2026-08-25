# AWS EC2 & Apache Tomcat Production Deployment Guide

This guide provides step-by-step instructions for deploying **AI ResumeForge** on an **AWS EC2 Ubuntu 22.04 / 24.04 LTS** instance running **Apache Tomcat 10**, **Java 17**, and **MySQL 8.0**.

---

## 1. Architecture Diagram

```
Internet (Users)
      │
      ▼ (Port 80 / 443 / 8080)
┌────────────────────────────────────────┐
│               AWS EC2                  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │       Apache Tomcat 10           │  │
│  │   ┌───────────────────────────┐  │  │
│  │   │  resume-forge.war (Spring)│  │  │
│  │   └─────────────┬─────────────┘  │  │
│  └─────────────────┼────────────────┘  │
│                    │ (JDBC 3306)       │
│  ┌─────────────────▼────────────────┐  │
│  │           MySQL 8.0              │  │
│  └──────────────────────────────────┘  │
└────────────────────┬───────────────────┘
                     │ HTTPS REST
                     ▼
          Configurable AI API Endpoint
```

---

## 2. Launch AWS EC2 Instance

1. Log in to the **AWS Management Console**.
2. Navigate to **EC2** → **Launch Instance**.
3. **Name**: `ai-resumeforge-server`
4. **AMI**: Ubuntu Server 22.04 LTS or 24.04 LTS (64-bit x86).
5. **Instance Type**: `t3.small` or `t3.medium` (recommended for JVM + Tomcat).
6. **Key Pair**: Select or generate an `.pem` SSH key.
7. **Security Group Configuration**:
   - Inbound Rules:
     - SSH (Port `22`) from your IP.
     - HTTP (Port `80`) from `0.0.0.0/0`.
     - Custom TCP (Port `8080`) from `0.0.0.0/0` (Tomcat Web Port).
     - HTTPS (Port `443`) from `0.0.0.0/0`.

---

## 3. Connect via SSH & Install Dependencies

```bash
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>

# Update repositories
sudo apt update && sudo apt upgrade -y

# Install Java 17, Maven, MySQL Server, Git
sudo apt install -y openjdk-17-jdk maven mysql-server git
```

---

## 4. Configure MySQL Database

```bash
sudo mysql
```

Run inside the MySQL terminal:

```sql
CREATE DATABASE IF NOT EXISTS resumeforge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'resumeforge_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES ON resumeforge.* TO 'resumeforge_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 5. Install & Configure Apache Tomcat 10

```bash
# Download Tomcat 10
cd /tmp
wget https://archive.apache.org/dist/tomcat/tomcat-10/v10.1.20/bin/apache-tomcat-10.1.20.tar.gz

# Extract to /opt/tomcat
sudo mkdir -p /opt/tomcat
sudo tar xzvf apache-tomcat-10.1.20.tar.gz -C /opt/tomcat --strip-components=1

# Create tomcat system user & configure permissions
sudo useradd -s /bin/false -d /opt/tomcat tomcat || true
sudo chown -R tomcat:tomcat /opt/tomcat
sudo chmod -R u+x /opt/tomcat/bin
```

---

## 6. Build the Production WAR File

Clone your repository on the EC2 instance or build locally and SCP:

```bash
git clone https://github.com/your-username/ai-resumeforge.git
cd ai-resumeforge/backend

# Build WAR package
mvn clean package -DskipTests
```

This generates `target/resume-forge.war`.

---

## 7. Deploy WAR to Tomcat

```bash
# Stop Tomcat
sudo /opt/tomcat/bin/shutdown.sh

# Remove default ROOT application
sudo rm -rf /opt/tomcat/webapps/ROOT /opt/tomcat/webapps/ROOT.war

# Copy WAR as ROOT application
sudo cp target/resume-forge.war /opt/tomcat/webapps/ROOT.war
sudo chown tomcat:tomcat /opt/tomcat/webapps/ROOT.war

# Export Environment Variables
sudo bash -c 'cat >> /opt/tomcat/bin/setenv.sh <<EOF
export SPRING_PROFILES_ACTIVE=prod
export DB_URL="jdbc:mysql://localhost:3306/resumeforge?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
export DB_USERNAME="resumeforge_user"
export DB_PASSWORD="StrongPassword123!"
export AI_API_KEY="your-openai-or-gemini-key"
export AI_MODEL="gpt-4o-mini"
EOF'

sudo chmod +x /opt/tomcat/bin/setenv.sh
sudo chown tomcat:tomcat /opt/tomcat/bin/setenv.sh

# Start Tomcat
sudo /opt/tomcat/bin/startup.sh
```

---

## 8. Verification & Logs

```bash
# Tail Tomcat application logs
tail -f /opt/tomcat/logs/catalina.out
```

Open your browser and visit:
`http://<your-ec2-public-ip>:8080/`
