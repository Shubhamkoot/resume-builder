package com.resumeforge.dto.response;

import java.time.LocalDateTime;

public class ActivityLogResponse {
    private Long id;
    private String actionType;
    private String description;
    private String entityType;
    private Long entityId;
    private LocalDateTime createdAt;

    public ActivityLogResponse() {}

    public ActivityLogResponse(Long id, String actionType, String description, String entityType, Long entityId, LocalDateTime createdAt) {
        this.id = id;
        this.actionType = actionType;
        this.description = description;
        this.entityType = entityType;
        this.entityId = entityId;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
