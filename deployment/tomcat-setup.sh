#!/usr/bin/env bash
# Apache Tomcat 10 Deployment Setup Script for Ubuntu / Debian Linux

set -e

echo "=== AI ResumeForge: Apache Tomcat & Java 17 Setup ==="

# 1. Update Packages
sudo apt update && sudo apt upgrade -y

# 2. Install Java 17 OpenJDK
echo "Installing OpenJDK 17..."
sudo apt install -y openjdk-17-jdk openjdk-17-jre maven

# 3. Install MySQL Server
echo "Installing MySQL Server..."
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# 4. Create Tomcat User and Group
sudo groupadd --system tomcat || true
sudo useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat || true

# 5. Download and Extract Apache Tomcat 10
TOMCAT_VERSION="10.1.20"
cd /tmp
wget https://archive.apache.org/dist/tomcat/tomcat-10/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz
sudo mkdir -p /opt/tomcat
sudo tar xzvf apache-tomcat-${TOMCAT_VERSION}.tar.gz -C /opt/tomcat --strip-components=1

# 6. Set Permissions
sudo chown -R tomcat:tomcat /opt/tomcat
sudo chmod -R u+x /opt/tomcat/bin

# 7. Create Systemd Service for Tomcat
sudo bash -c 'cat > /etc/systemd/system/tomcat.service <<EOF
[Unit]
Description=Apache Tomcat 10 Web Application Container
After=network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment="JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64"
Environment="JAVA_OPTS=-Djava.awt.headless=true -Xms512M -Xmx1024M -server -XX:+UseG1GC"
Environment="CATALINA_HOME=/opt/tomcat"
Environment="CATALINA_BASE=/opt/tomcat"
Environment="CATALINA_PID=/opt/tomcat/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseG1GC"

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
EOF'

# 8. Reload Systemd and Start Tomcat
sudo systemctl daemon-reload
sudo systemctl start tomcat
sudo systemctl enable tomcat

echo "=== Apache Tomcat 10 is running! Verify on port 8080 ==="
