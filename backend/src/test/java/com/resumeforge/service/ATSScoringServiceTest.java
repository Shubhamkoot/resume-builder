package com.resumeforge.service;

import com.resumeforge.dto.request.SkillDto;
import com.resumeforge.dto.response.ATSScoreResponse;
import com.resumeforge.dto.response.JobAnalysisResponse;
import com.resumeforge.dto.response.ResumeResponse;
import com.resumeforge.mapper.ResumeMapper;
import com.resumeforge.service.ats.ATSScoringService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ATSScoringServiceTest {

    private ATSScoringService atsScoringService;

    @BeforeEach
    void setUp() {
        atsScoringService = new ATSScoringService(new ResumeMapper());
    }

    @Test
    void testCalculateScore_DeterministicScoring() {
        ResumeResponse resume = new ResumeResponse();
        resume.setSummary("Senior Java Developer with 5 years experience in Spring Boot and MySQL.");
        resume.setSkills(List.of(
                new SkillDto("Java", "Programming Languages"),
                new SkillDto("Spring Boot", "Frameworks"),
                new SkillDto("MySQL", "Databases"),
                new SkillDto("Docker", "DevOps")
        ));

        JobAnalysisResponse jd = new JobAnalysisResponse();
        jd.setRequiredSkills(List.of("Java", "Spring Boot", "MySQL", "AWS"));
        jd.setPreferredSkills(List.of("Kubernetes"));

        ATSScoreResponse score = atsScoringService.calculateScore(resume, jd);

        assertNotNull(score);
        assertTrue(score.getOverallScore() > 50, "Score should be higher than 50");
        assertTrue(score.getMatchedSkills().contains("Java"));
        assertTrue(score.getMatchedSkills().contains("Spring Boot"));
        assertTrue(score.getMissingSkills().contains("AWS"));
        assertTrue(score.getMissingSkills().contains("Kubernetes"));
    }
}
