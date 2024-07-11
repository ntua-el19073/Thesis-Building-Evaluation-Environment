package com.thesis.beeBackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.thesis.beeBackend.dto.EvaluationDTO;
import com.thesis.beeBackend.dto.EvaluationRequestDTO;
import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.repository.EvaluationRepository;

@Service
public class EvaluationServiceImpl implements EvaluationService{

    @Autowired
    private EvaluationRepository evaluationRepository;

    public ResponseEntity<EvaluationDTO> evaluate(EvaluationRequestDTO request) {
        int score = (int) ((request.getEui() + request.getHumidityRange() + request.getTemperatureRange() )/3);
        Evaluation evaluation = Evaluation.builder()
            .buildingId(request.getBuildingId())
            .ownerEmail(request.getOwnerEmail())
            .yearOfEvaluation(request.getYearOfEvaluation())
            .energyConsumptionScore(score)
            .indoorAirQualityScore(100)
            .inclusivityScore(50)
            .waterConsumptionScore(10)
            .build();
        evaluationRepository.save(evaluation);
        return ResponseEntity.ok(toDto(evaluation));
        
    }

    public List<Evaluation> getEvaluationsForBuilding(Long buildingId) {
        // Implement logic to fetch evaluations for the specified building from the repository
        return evaluationRepository.findByBuildingId(buildingId);
    }

    private static EvaluationDTO toDto(Evaluation evaluation) {
        EvaluationDTO dto = new EvaluationDTO();
        dto.setEvaluationId(evaluation.getId());
        dto.setScore(evaluation.getEnergyConsumptionScore());
        return dto;
    }
    
}


