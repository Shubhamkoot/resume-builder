package com.resumeforge.dto.response;

import java.util.ArrayList;
import java.util.List;

public class AIImproveResponse {

    private String type;
    private String originalText;
    private String improvedText;
    private List<String> bulletPoints = new ArrayList<>();
    private List<String> changesMade = new ArrayList<>();
    private String rationale;

    public AIImproveResponse() {}

    public AIImproveResponse(String type, String originalText, String improvedText, String rationale) {
        this.type = type;
        this.originalText = originalText;
        this.improvedText = improvedText;
        this.rationale = rationale;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getOriginalText() { return originalText; }
    public void setOriginalText(String originalText) { this.originalText = originalText; }
    public String getImprovedText() { return improvedText; }
    public void setImprovedText(String improvedText) { this.improvedText = improvedText; }
    public List<String> getBulletPoints() { return bulletPoints; }
    public void setBulletPoints(List<String> bulletPoints) { this.bulletPoints = bulletPoints; }
    public List<String> getChangesMade() { return changesMade; }
    public void setChangesMade(List<String> changesMade) { this.changesMade = changesMade; }
    public String getRationale() { return rationale; }
    public void setRationale(String rationale) { this.rationale = rationale; }
}
