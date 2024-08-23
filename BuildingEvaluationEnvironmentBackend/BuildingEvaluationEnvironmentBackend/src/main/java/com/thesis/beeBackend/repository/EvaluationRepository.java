package com.thesis.beeBackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.thesis.beeBackend.entity.*;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findAllByOwnerEmail(String ownerEmail);

    Optional<Evaluation> findById(Long id);

    List<Evaluation> findByBuildingId(Long buildingId);

    Optional<Evaluation> findByBuildingIdAndYear(Long buildingId, int year);

}