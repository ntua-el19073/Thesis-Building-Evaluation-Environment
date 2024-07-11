package com.thesis.beeBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationRequestDTO {
    private Long id;
    private int yearOfEvaluation;
    private String ownerEmail;
    private Long buildingId;

    private double eui;
    private double energyProduced;
    private double maxCo2Level;
    private int humidityRange;
    private int temperatureRange;
    private double minLightingLevel;
    private double maxNoiseLevel;
    private double waterConsumptionPerOccupant;
    private double waterReusePercentage;
    private boolean elevatorForEveryFloor;
    private boolean rampOrEntryForDisabled;
    private boolean bathroomForDisabled;
   
}
