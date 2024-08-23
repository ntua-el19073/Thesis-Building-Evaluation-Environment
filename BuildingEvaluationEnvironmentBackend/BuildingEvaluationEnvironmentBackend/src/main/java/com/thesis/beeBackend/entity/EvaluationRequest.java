package com.thesis.beeBackend.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "evaluation_requests")
public class EvaluationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "year")
    private int year;

    @Column(name = "owner_email")
    private String ownerEmail;

    @Column(name = "building_id")
    private Long buildingId;

    @Column(name = "eui")
    private double eui;

    @Column(name = "energy_produced")
    private double energyProduced;

    @Column(name = "air_quality")
    private double airQuality;

    @Column(name = "humidity")
    private double humidity;

    @Column(name = "temperature")
    private double temperature;

    @Column(name = "lighting_comfort")
    private double lighting;

    @Column(name = "noise_comfort")
    private double noise;

    @Column(name = "water_consumption")
    private double waterConsumption;

    @Column(name = "water_reused")
    private double waterReused;

    @Column(name = "recycling")
    private double recycling;

    @Column(name = "elevator_for_every_floor")
    private boolean elevatorForEveryFloor;

    @Column(name = "ramp_or_entry_for_disabled")
    private boolean rampOrEntryForDisabled;

    @Column(name = "bathroom_for_disabled")
    private boolean bathroomForDisabled;

    @Column(name = "gate_width")
    private boolean gateWidth;

    @Column(name = "public_transport")
    private boolean publicTransport;

    @Column(name = "parking")
    private boolean parking;

    @Column(name = "importance")
    private String importance;

    // Getters and Setters

    public Map<String, String> getImportanceMap() {
        if (importance == null || importance.isEmpty()) {
            return new HashMap<>();
        }
        try {
            return new ObjectMapper().readValue(importance, HashMap.class);
        } catch (IOException e) {
            throw new RuntimeException("Could not deserialize JSON to Map", e);
        }
    }

    public void setImportanceMap(Map<String, String> importanceMap) {
        try {
            this.importance = new ObjectMapper().writeValueAsString(importanceMap);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Could not serialize Map to JSON", e);
        }
    }
}
