package com.resumeforge.repository;

import com.resumeforge.entity.ResumeVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeVersionRepository extends JpaRepository<ResumeVersion, Long> {
    List<ResumeVersion> findByResumeIdOrderByVersionNumberDesc(Long resumeId);
}
