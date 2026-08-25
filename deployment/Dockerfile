# Multi-stage Dockerfile for AI ResumeForge
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend WAR
FROM maven:3.9.6-eclipse-temurin-17 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Apache Tomcat Deployment
FROM tomcat:10.1-jdk17-temurin
RUN rm -rf /usr/local/tomcat/webapps/ROOT /usr/local/tomcat/webapps/ROOT.war
COPY --from=backend-builder /app/backend/target/resume-forge.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
