package com.thesis.beeBackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.thesis.beeBackend.dto.EvaluationDTO;
import com.thesis.beeBackend.dto.EvaluationRequestDTO;
import com.thesis.beeBackend.entity.Evaluation;

public interface EvaluationController {

    ResponseEntity<EvaluationDTO> processEvaluation(@RequestBody EvaluationRequestDTO request);

    public ResponseEntity<List<Evaluation>> getEvaluationsForBuilding(@RequestBody Long buildingId);
} 
    

