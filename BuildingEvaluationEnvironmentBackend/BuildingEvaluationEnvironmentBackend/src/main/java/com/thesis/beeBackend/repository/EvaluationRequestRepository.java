package com.thesis.beeBackend.repository;

import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.entity.EvaluationRequest;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRequestRepository extends JpaRepository<EvaluationRequest, Long> {

    Optional<EvaluationRequest> findByBuildingIdAndYear(Long buildingId, int year);

    void deleteByYearAndBuildingId(int year, Long buildingId);

}