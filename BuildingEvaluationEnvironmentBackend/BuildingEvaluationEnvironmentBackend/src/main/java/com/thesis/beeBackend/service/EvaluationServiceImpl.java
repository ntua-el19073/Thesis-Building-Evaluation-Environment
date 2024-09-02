package com.thesis.beeBackend.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.thesis.beeBackend.controller.UserController;
import com.thesis.beeBackend.dto.EvaluationDTO;
import com.thesis.beeBackend.dto.EvaluationRequestDTO;
import com.thesis.beeBackend.entity.Building;
import com.thesis.beeBackend.entity.ConsumptionBenchmark;
import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.entity.EvaluationRequest;
import com.thesis.beeBackend.repository.BuildingRepository;
import com.thesis.beeBackend.repository.ConsumptionBenchmarkRepository;
import com.thesis.beeBackend.repository.EvaluationRepository;
import com.thesis.beeBackend.repository.EvaluationRequestRepository;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private EvaluationRequestRepository evaluationRequestRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private ConsumptionBenchmarkRepository consumptionBenchmarkRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public ResponseEntity<Double> evaluate(EvaluationRequestDTO evaluationRequestDTO) {
        ConsumptionBenchmark consumptionBenchmark;
        logger.info("Here 1 : " + evaluationRequestDTO);
        try {
            consumptionBenchmark = getConsumptionBenchmark(evaluationRequestDTO.getBuildingId());
        } catch (Exception e) {
            logger.error("Failed to retrieve consumption benchmark", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        logger.info("Here 2: " + consumptionBenchmark);
        EvaluationRequest request = toRequestEntity(evaluationRequestDTO);

        double energyPerformanceScore = calculateEnergyPerformanceScore(evaluationRequestDTO,
                consumptionBenchmark.getMedianEnergyConsumption());
        logger.info("EnergyPerformanceScore is " + energyPerformanceScore);

        double ieqScore = calculateIEQScore(evaluationRequestDTO);
        logger.info("IEQSCORE is " + ieqScore);

        double accessibilityScore = calculateAccessibilityScore(evaluationRequestDTO);
        logger.info("AccessibilityScore is " + accessibilityScore);

        double environmentCircularityScore = calculateEnvironmentCircularityScore(evaluationRequestDTO,
                consumptionBenchmark.getMedianWaterConsumption());
        logger.info("EnvironentCircularityScore is " + environmentCircularityScore);

        double sectionImportanceSum = getSectionImportanceSum(evaluationRequestDTO);
        logger.info("SectionImportanceSUM is " + sectionImportanceSum);

        double score;
        if (sectionImportanceSum == 0) {
            score = 0;
        } else {
            score = (energyPerformanceScore
                    * mapImportance(evaluationRequestDTO.getImportance().get("energySection"))
                    + ieqScore * mapImportance(evaluationRequestDTO.getImportance().get("ieqSection")) +
                    environmentCircularityScore
                            * mapImportance(evaluationRequestDTO.getImportance().get("environmentCircularitySection"))
                    + accessibilityScore
                            * mapImportance(evaluationRequestDTO.getImportance().get("accessibilitySection")))
                    / sectionImportanceSum;
        }

        score = Math.round(score * 100.0) / 100.0;
        Evaluation evaluation = Evaluation.builder()
                .buildingId(request.getBuildingId())
                .ownerEmail(request.getOwnerEmail())
                .year(request.getYear())
                .energyPerformanceScore(energyPerformanceScore)
                .indoorEnvironmentalQualityScore(ieqScore)
                .environmentCircularityScore(environmentCircularityScore)
                .accessibilityScore(accessibilityScore)
                .totalScore(score)
                .build();

        Optional<EvaluationRequest> previousRequest = evaluationRequestRepository
                .findByBuildingIdAndYear(evaluationRequestDTO.getBuildingId(), evaluationRequestDTO.getYear());
        if (previousRequest.isPresent()) {
            evaluationRequestRepository.delete(previousRequest.get());
        }
        evaluationRequestRepository.save(request);

        Optional<Evaluation> previousEvaluation = evaluationRepository
                .findByBuildingIdAndYear(evaluationRequestDTO.getBuildingId(), evaluationRequestDTO.getYear());
        if (previousEvaluation.isPresent()) {
            evaluationRepository.delete(previousEvaluation.get());
        }
        evaluationRepository.save(evaluation);

        return ResponseEntity.ok(score);
    }

    public ResponseEntity<EvaluationRequest> getPreviousEvaluationRequest(Long buildingId, int year) {
        return ResponseEntity.ok().body(
                evaluationRequestRepository
                        .findByBuildingIdAndYear(buildingId, year)
                        .get());
    }

    public ResponseEntity<Boolean> existenceCheck(Long buildingId, int year) {
        return ResponseEntity.ok().body(
                evaluationRepository
                        .findByBuildingIdAndYear(buildingId, year)
                        .isPresent());
    }

    public List<Evaluation> getEvaluationsForBuilding(Long buildingId) {
        // Implement logic to fetch evaluations for the specified building from the
        // repository
        return evaluationRepository.findByBuildingId(buildingId);
    }

    public ResponseEntity<String> removeEvaluation(int year, Long buildingId) {
        try {
            logger.info("Here1");
            Optional<Evaluation> eval = evaluationRepository.findByBuildingIdAndYear(buildingId, year);
            if (eval.isPresent()) {
                evaluationRepository.delete(eval.get());

            }
            Optional<EvaluationRequest> evalRequest = evaluationRequestRepository.findByBuildingIdAndYear(buildingId,
                    year);
            if (evalRequest.isPresent()) {
                evaluationRequestRepository.delete(evalRequest.get());
            }
            logger.info("Here2");
            evaluationRequestRepository.deleteByYearAndBuildingId(year, buildingId);
            return ResponseEntity.ok(
                    "Evaluation and EvaluationRequest for building with id " + buildingId + "for year " + year
                            + "was deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Calculate the IEQ score
    private double calculateIEQScore(EvaluationRequestDTO evaluationRequestDTO) {
        Map<String, String> importanceMap = evaluationRequestDTO.getImportance();

        int airQualityImportance = mapImportance(importanceMap.get("airQuality"));
        int humidityImportance = mapImportance(importanceMap.get("humidity"));
        int temperatureImportance = mapImportance(importanceMap.get("temperature"));
        int lightingImportance = mapImportance(importanceMap.get("lighting"));
        int noiseImportance = mapImportance(importanceMap.get("noise"));

        int totalImportanceSum = airQualityImportance + humidityImportance + temperatureImportance
                + lightingImportance + noiseImportance;

        // logger.info("Total Importance IEQ sum is" + totalImportanceSum);
        if (totalImportanceSum == 0) {
            return 0; // Avoid division by zero
        }

        // Min-Max scaling normalization (cost) with Max equal to 980 and min equal to
        // 190. Values below 190 are considered perfect (100%)
        double air_quality = evaluationRequestDTO.getAirQuality();
        logger.info("Air quality is " + air_quality);

        // Calculate the weighted sum for IEQ criteria
        double ieqScoreSum = (air_quality * airQualityImportance
                + evaluationRequestDTO.getHumidity() * humidityImportance
                + evaluationRequestDTO.getTemperature() * temperatureImportance
                + evaluationRequestDTO.getLighting() * lightingImportance
                + evaluationRequestDTO.getNoise() * noiseImportance);

        // logger.info("IEQSCORESUM is " + ieqScoreSum);
        double ieqScore = ieqScoreSum / totalImportanceSum;
        // logger.info("total ieq score is " + ieqScore);
        return Math.round(ieqScore * 100.0) / 100.0;
    }

    private double calculateEnergyPerformanceScore(EvaluationRequestDTO evaluationRequestDTO,
            int medianEnergyConsumption) {
        Map<String, String> importanceMap = evaluationRequestDTO.getImportance();
        int euiImportance = mapImportance(importanceMap.get("eui"));
        int energyProducedImportance = mapImportance(importanceMap.get("energyProduced"));

        int totalImportanceSum = euiImportance + energyProducedImportance;

        logger.info("Total Importance Energy sum is" + totalImportanceSum);
        if (totalImportanceSum == 0) {
            return 0; // Avoid division by zero
        }

        // Calculate energy consumption score
        double buildingEnergyConsumption = evaluationRequestDTO.getEui();
        double energyConsumptionScore = calculateConsumptionScore(buildingEnergyConsumption, medianEnergyConsumption);
        logger.info("EnergyConsumptionScore is: " + energyConsumptionScore);
        // The perfect energy produced benchmark is set at 50% of the building's energy
        // consumed. Any value above that gets
        // a perfect score
        double energyProducedScore = evaluationRequestDTO.getEnergyProduced();
        logger.info("EnergyProduced Score is: " + energyProducedScore);
        double energyPerformanceScoreSum = (energyConsumptionScore * euiImportance)
                + (energyProducedScore * energyProducedImportance);

        return Math.round((energyPerformanceScoreSum / totalImportanceSum) * 100.0) / 100.0;
    }

    private double calculateEnvironmentCircularityScore(EvaluationRequestDTO evaluationRequestDTO,
            int medianWaterConsumption) {
        Map<String, String> importanceMap = evaluationRequestDTO.getImportance();
        int waterConsumptionImportance = mapImportance(importanceMap.get("waterConsumption"));
        int waterReusedImportance = mapImportance(importanceMap.get("waterReused"));
        int recyclingImportance = mapImportance(importanceMap.get("recycling"));

        int totalImportanceSum = waterConsumptionImportance + waterReusedImportance + recyclingImportance;

        // logger.info("Total Importance IEQ sum is" + totalImportanceSum);
        if (totalImportanceSum == 0) {
            return 0; // Avoid division by zero
        }

        // Calculate water consumption score
        double buildingWaterConsumption = evaluationRequestDTO.getWaterConsumption();
        double waterConsumptionScore = calculateConsumptionScore(buildingWaterConsumption, medianWaterConsumption);

        logger.info("Water consumption Score is: " + waterConsumptionScore);
        double waterReusedScore = evaluationRequestDTO.getWaterReused();
        logger.info("Water recycling Score is: " + waterReusedScore);

        double recyclingScore = evaluationRequestDTO.getRecycling();

        double environmentCircularityScoreSum = (waterConsumptionScore * waterConsumptionImportance)
                + (waterReusedScore * waterReusedImportance)
                + (recyclingScore * recyclingImportance);

        return Math.round((environmentCircularityScoreSum / totalImportanceSum) * 100.0) / 100.0;
    }

    private double calculateAccessibilityScore(EvaluationRequestDTO evaluationRequestDTO) {
        int trueCount = 0;

        if (evaluationRequestDTO.isElevatorForEveryFloor()) {
            trueCount++;
        }
        if (evaluationRequestDTO.isRampOrEntryForDisabled()) {
            trueCount++;
        }
        if (evaluationRequestDTO.isBathroomForDisabled()) {
            trueCount++;
        }
        if (evaluationRequestDTO.isGateWidth()) {
            trueCount++;
        }
        if (evaluationRequestDTO.isPublicTransport()) {
            trueCount++;
        }
        if (evaluationRequestDTO.isParking()) {
            trueCount++;
        }

        // Calculate the accessibility score
        int totalCriteria = 6; // Total number of boolean criteria
        double accessibilityScore = (double) trueCount / totalCriteria * 100; // Multiply by 100 to get a percentage

        return Math.round(accessibilityScore * 100.0) / 100.0;
    }

    // Example method to get section importance sum
    private int getSectionImportanceSum(EvaluationRequestDTO evaluationRequestDTO) {
        Map<String, String> importanceMap = evaluationRequestDTO.getImportance();
        return mapImportance(importanceMap.get("energySection"))
                + mapImportance(importanceMap.get("ieqSection"))
                + mapImportance(importanceMap.get("environmentCircularitySection"))
                + mapImportance(importanceMap.get("accessibilitySection"));
    }

    private ConsumptionBenchmark getConsumptionBenchmark(Long buildingId) {
        String country = "";

        Optional<Building> buildingOptional = buildingRepository.findById(buildingId);
        Building building = buildingOptional.get();
        country = building.getCountry();
        logger.info(country);
        Optional<ConsumptionBenchmark> consumptionBenchmarkOptional = consumptionBenchmarkRepository
                .findByCountry(country);
        return consumptionBenchmarkOptional.get();
    }

    private double calculateConsumptionScore(double buildingConsumption, int medianConsumption) {
        double maxThreshold = medianConsumption * 2.0; // Twice the benchmark
        double minThreshold = medianConsumption;

        if (buildingConsumption <= minThreshold) {
            return 100.0; // Best possible score
        } else if (buildingConsumption >= maxThreshold) {
            return 0.0; // Worst possible score
        } else {
            // Linearly decrease the score from 100 to 0 between minThreshold and
            // maxThreshold
            double overConsumption = buildingConsumption - minThreshold;
            double scoreRange = maxThreshold - minThreshold;
            double scoreReduction = (overConsumption / scoreRange) * 100.0;

            return (100.0 - scoreReduction);
        }
    }

    private EvaluationRequest toRequestEntity(EvaluationRequestDTO evaluationRequestDTO) {
        EvaluationRequest request = new EvaluationRequest();
        request.setYear(evaluationRequestDTO.getYear());
        request.setOwnerEmail(evaluationRequestDTO.getOwnerEmail());
        request.setBuildingId(evaluationRequestDTO.getBuildingId());
        request.setEui(evaluationRequestDTO.getEui());
        request.setEnergyProduced(evaluationRequestDTO.getEnergyProduced());
        request.setAirQuality(evaluationRequestDTO.getAirQuality());
        request.setHumidity(evaluationRequestDTO.getHumidity());
        request.setTemperature(evaluationRequestDTO.getTemperature());
        request.setLighting(evaluationRequestDTO.getLighting());
        request.setNoise(evaluationRequestDTO.getNoise());
        request.setWaterConsumption(evaluationRequestDTO.getWaterConsumption());
        request.setWaterReused(evaluationRequestDTO.getWaterReused());
        request.setRecycling(evaluationRequestDTO.getRecycling());
        request.setElevatorForEveryFloor(evaluationRequestDTO.isElevatorForEveryFloor());
        request.setRampOrEntryForDisabled(evaluationRequestDTO.isRampOrEntryForDisabled());
        request.setBathroomForDisabled(evaluationRequestDTO.isBathroomForDisabled());
        request.setGateWidth(evaluationRequestDTO.isGateWidth());
        request.setPublicTransport(evaluationRequestDTO.isPublicTransport());
        request.setParking(evaluationRequestDTO.isParking());
        request.setImportanceMap(evaluationRequestDTO.getImportance());

        return request;
    }

    // Convert importance values from 0 to 4
    private int mapImportance(String importanceValue) {
        switch (importanceValue.toLowerCase()) {
            case "minor":
                return 1;
            case "medium":
                return 2;
            case "important":
                return 3;
            case "critical":
                return 4;
            default:
                return 0; // Assuming "none" or unknown values map to 0
        }
    }

}
