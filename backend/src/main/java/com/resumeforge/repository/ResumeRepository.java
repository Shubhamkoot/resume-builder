package com.resumeforge.repository;

import com.resumeforge.entity.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserIdOrderByUpdatedAtDesc(Long userId);
    Page<Resume> findByUserIdOrderByUpdatedAtDesc(Long userId, Pageable pageable);
    Optional<Resume> findByIdAndUserId(Long id, Long userId);
    Long countByUserId(Long userId);
    Long countByUserIdAndIsAiGenerated(Long userId, Boolean isAiGenerated);

    @Query("SELECT AVG(r.atsScore) FROM Resume r WHERE r.user.id = :userId")
    Double findAverageAtsScoreByUserId(@Param("userId") Long userId);
}
