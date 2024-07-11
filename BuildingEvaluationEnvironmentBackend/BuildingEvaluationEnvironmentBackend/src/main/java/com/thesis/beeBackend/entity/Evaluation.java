

package com.thesis.beeBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "evaluations")
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "building_id")
    private Long buildingId;

    @Column(name = "year_of_evaluation")
    private int yearOfEvaluation;

    @Column(name = "owner_email")
    private String ownerEmail;

    @Column(name = "energy_consumption_score")
    private int energyConsumptionScore;

    @Column(name = "indoor_air_quality_score")
    private int indoorAirQualityScore;

    @Column(name = "water_consumption_score")
    private int waterConsumptionScore;

    @Column(name = "inclusivity_score")
    private int inclusivityScore;
}