package com.thesis.beeBackend.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationRequestDTO {
    private int year;
    private String ownerEmail;
    private Long buildingId;

    private double eui;
    private double energyProduced;
    private double airQuality;
    private double humidity;
    private double temperature;
    private double lighting;
    private double noise;
    private double waterConsumption;
    private double waterReused;
    private double recycling;
    private boolean elevatorForEveryFloor;
    private boolean rampOrEntryForDisabled;
    private boolean bathroomForDisabled;
    private boolean gateWidth;
    private boolean publicTransport;
    private boolean parking;

    private Map<String, String> importance;

}
