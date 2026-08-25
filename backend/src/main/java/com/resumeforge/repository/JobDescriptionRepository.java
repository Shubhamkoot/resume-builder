package com.resumeforge.repository;

import com.resumeforge.entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {
    List<JobDescription> findByUserIdOrderByCreatedAtDesc(Long userId);
    Long countByUserId(Long userId);
}
