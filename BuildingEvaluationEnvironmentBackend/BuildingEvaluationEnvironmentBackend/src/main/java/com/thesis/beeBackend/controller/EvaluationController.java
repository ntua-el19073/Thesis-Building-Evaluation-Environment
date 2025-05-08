package com.thesis.beeBackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.thesis.beeBackend.dto.EvaluationDTO;
import com.thesis.beeBackend.dto.EvaluationRequestDTO;
import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.entity.EvaluationRequest;

public interface EvaluationController {

    ResponseEntity<Double> processEvaluation(@RequestBody EvaluationRequestDTO request);

    ResponseEntity<List<Evaluation>> getEvaluationsForBuilding(@RequestBody Long buildingId);

    ResponseEntity<Boolean> existenceCheck(@RequestParam Long buildingid, @RequestParam int yearOfEvaluation);

    ResponseEntity<EvaluationRequest> getPreviousEvaluationRequest(@PathVariable Long buildingId,
            @PathVariable int year);

    ResponseEntity<String> removeEvaluation(@RequestParam String year, @RequestParam String buildingId);

}
