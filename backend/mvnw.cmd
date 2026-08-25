@REM ----------------------------------------------------------------------------
@REM Maven Wrapper Startup Batch script for Windows
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%" == "" @ECHO OFF
@SETLOCAL EnableExtensions EnableDelayedExpansion

SET MAVEN_PROJECTBASEDIR=%~dp0
IF "%MAVEN_PROJECTBASEDIR:~-1%"=="\" SET MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

IF NOT EXIST %WRAPPER_JAR% (
    powershell -Command "Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar' -OutFile '%WRAPPER_JAR%'"
)

java -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -classpath %WRAPPER_JAR% %WRAPPER_LAUNCHER% %*
