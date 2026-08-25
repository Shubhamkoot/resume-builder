package com.resumeforge.service.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeforge.dto.request.AIImproveRequest;
import com.resumeforge.dto.request.JobAnalyzeRequest;
import com.resumeforge.dto.response.AIImproveResponse;
import com.resumeforge.dto.response.JobAnalysisResponse;
import com.resumeforge.dto.response.ResumeResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Primary
public class OpenAICompatibleAIService implements AIService {

    private static final Logger logger = LoggerFactory.getLogger(OpenAICompatibleAIService.class);

    @Value("${app.ai.api-key:}")
    private String apiKey;

    @Value("${app.ai.api-url:https://api.openai.com/v1/chat/completions}")
    private String apiUrl;

    @Value("${app.ai.model:gpt-4o-mini}")
    private String model;

    private final MockAIService mockAIService;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    public OpenAICompatibleAIService(MockAIService mockAIService, ObjectMapper objectMapper) {
        this.mockAIService = mockAIService;
        this.objectMapper = objectMapper;
        this.restTemplate = new RestTemplate();
    }

    @Override
    public JobAnalysisResponse analyzeJobDescription(JobAnalyzeRequest request) {
        if (isKeyMissing()) {
            logger.info("AI_API_KEY is not set or empty. Using built-in intelligent JD analyzer.");
            return mockAIService.analyzeJobDescription(request);
        }

        try {
            String prompt = "Analyze this Job Description:\n\nJob Title: " + request.getJobTitle() +
                    "\nCompany: " + (request.getCompanyName() != null ? request.getCompanyName() : "N/A") +
                    "\nJob Description:\n" + request.getJobDescription();

            String responseContent = callLlm(AIPrompts.SYSTEM_JD_ANALYSIS, prompt);
            String cleanJson = extractJson(responseContent);

            return objectMapper.readValue(cleanJson, JobAnalysisResponse.class);
        } catch (Exception ex) {
            logger.warn("External AI call failed or timed out. Gracefully falling back to built-in analyzer. Error: {}", ex.getMessage());
            return mockAIService.analyzeJobDescription(request);
        }
    }

    @Override
    public ResumeResponse generateTailoredResume(ResumeResponse baseResume, String jobTitle, String companyName, String jobDescription) {
        if (isKeyMissing()) {
            logger.info("AI_API_KEY is not set. Using built-in factual resume tailoring engine.");
            return mockAIService.generateTailoredResume(baseResume, jobTitle, companyName, jobDescription);
        }

        try {
            String resumeJson = objectMapper.writeValueAsString(baseResume);
            String prompt = "Base Resume JSON:\n" + resumeJson +
                    "\n\nTarget Job:\nJob Title: " + jobTitle +
                    "\nCompany: " + companyName +
                    "\nJob Description:\n" + jobDescription;

            String responseContent = callLlm(AIPrompts.SYSTEM_RESUME_TAILORING, prompt);
            String cleanJson = extractJson(responseContent);

            ResumeResponse result = objectMapper.readValue(cleanJson, ResumeResponse.class);
            result.setUserId(baseResume.getUserId());
            result.setIsAiGenerated(true);
            return result;
        } catch (Exception ex) {
            logger.warn("External AI call failed. Gracefully falling back to built-in tailoring engine. Error: {}", ex.getMessage());
            return mockAIService.generateTailoredResume(baseResume, jobTitle, companyName, jobDescription);
        }
    }

    @Override
    public AIImproveResponse improveContent(AIImproveRequest request) {
        if (isKeyMissing()) {
            return mockAIService.improveContent(request);
        }

        try {
            String prompt = "Improvement Type: " + request.getType() +
                    "\nTarget Job Title: " + (request.getTargetJobTitle() != null ? request.getTargetJobTitle() : "Software Professional") +
                    "\nJob Description Context: " + (request.getJobDescription() != null ? request.getJobDescription() : "N/A") +
                    "\nOriginal Text to improve:\n" + request.getText();

            String responseContent = callLlm(AIPrompts.SYSTEM_IMPROVE_CONTENT, prompt);
            String cleanJson = extractJson(responseContent);

            return objectMapper.readValue(cleanJson, AIImproveResponse.class);
        } catch (Exception ex) {
            logger.warn("External AI improve call failed. Falling back to built-in improver. Error: {}", ex.getMessage());
            return mockAIService.improveContent(request);
        }
    }

    private boolean isKeyMissing() {
        return apiKey == null || apiKey.trim().isEmpty() || apiKey.equalsIgnoreCase("your_api_key_here");
    }

    private String callLlm(String systemPrompt, String userPrompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey.trim());

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", model);
        payload.put("temperature", 0.3);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));
        messages.add(Map.of("role", "user", "content", userPrompt));
        payload.put("messages", messages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode choices = root.path("choices");
            if (choices.isArray() && choices.size() > 0) {
                return choices.get(0).path("message").path("content").asText();
            }
        }

        throw new RuntimeException("Unexpected response from LLM API: " + response.getStatusCode());
    }

    private String extractJson(String text) {
        if (text == null) return "{}";
        text = text.trim();
        if (text.startsWith("```json")) {
            text = text.substring(7);
        } else if (text.startsWith("```")) {
            text = text.substring(3);
        }
        if (text.endsWith("```")) {
            text = text.substring(0, text.length() - 3);
        }
        return text.trim();
    }
}
