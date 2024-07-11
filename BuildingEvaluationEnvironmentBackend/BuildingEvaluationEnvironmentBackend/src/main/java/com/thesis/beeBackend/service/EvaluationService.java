package com.thesis.beeBackend.service;

import com.thesis.beeBackend.entity.Evaluation;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.thesis.beeBackend.dto.*;

public interface EvaluationService {

    ResponseEntity<EvaluationDTO> evaluate(EvaluationRequestDTO request);

    List<Evaluation> getEvaluationsForBuilding(Long buildingId);

} 
