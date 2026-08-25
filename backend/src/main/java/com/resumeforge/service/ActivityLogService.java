package com.resumeforge.service;

import com.resumeforge.dto.response.ActivityLogResponse;
import com.resumeforge.entity.ActivityLog;
import com.resumeforge.entity.User;
import com.resumeforge.repository.ActivityLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional
    public void logActivity(User user, String actionType, String description, String entityType, Long entityId) {
        ActivityLog log = new ActivityLog(user, actionType, description, entityType, entityId);
        activityLogRepository.save(log);
    }

    @Transactional(readOnly = true)
    public List<ActivityLogResponse> getRecentActivity(Long userId, int limit) {
        List<ActivityLog> logs = activityLogRepository.findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(0, limit));
        return logs.stream().map(log -> new ActivityLogResponse(
                log.getId(),
                log.getActionType(),
                log.getDescription(),
                log.getEntityType(),
                log.getEntityId(),
                log.getCreatedAt()
        )).collect(Collectors.toList());
    }
}
