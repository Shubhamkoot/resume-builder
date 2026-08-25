package com.resumeforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String actionType; // RESUME_CREATED, RESUME_UPDATED, AI_OPTIMIZED, JD_ANALYZED, PDF_DOWNLOADED, DOCX_DOWNLOADED, APPLICATION_ADDED

    private String description;
    private String entityType; // RESUME, APPLICATION, JOB_ANALYSIS
    private Long entityId;

    private LocalDateTime createdAt = LocalDateTime.now();

    public ActivityLog() {}

    public ActivityLog(User user, String actionType, String description, String entityType, Long entityId) {
        this.user = user;
        this.actionType = actionType;
        this.description = description;
        this.entityType = entityType;
        this.entityId = entityId;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
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
