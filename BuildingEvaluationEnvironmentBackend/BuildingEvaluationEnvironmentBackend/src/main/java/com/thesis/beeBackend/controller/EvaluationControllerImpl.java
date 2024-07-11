package com.thesis.beeBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.beeBackend.dto.EvaluationDTO;
import com.thesis.beeBackend.dto.EvaluationRequestDTO;
import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.service.EvaluationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class EvaluationControllerImpl implements EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/process")
    public ResponseEntity<EvaluationDTO> processEvaluation(@RequestBody EvaluationRequestDTO request) {
        logger.info(request.toString());
        return evaluationService.evaluate(request);
    }
    
    @GetMapping("/evaluations/{buildingId}")
    public ResponseEntity<List<Evaluation>> getEvaluationsForBuilding(@PathVariable Long buildingId) {
        List<Evaluation> evaluations = evaluationService.getEvaluationsForBuilding(buildingId);
        return new ResponseEntity<>(evaluations, HttpStatus.OK);
    }
}


