package com.thesis.beeBackend.service;

import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.entity.EvaluationRequest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.thesis.beeBackend.dto.*;

public interface EvaluationService {

    ResponseEntity<Double> evaluate(EvaluationRequestDTO request);

    List<Evaluation> getEvaluationsForBuilding(Long buildingId);

    ResponseEntity<Boolean> existenceCheck(Long buildingid, int yearOfEvaluation);

    ResponseEntity<EvaluationRequest> getPreviousEvaluationRequest(Long buildingId, int year);

    ResponseEntity<String> removeEvaluation(int year, Long buildingId);

}
