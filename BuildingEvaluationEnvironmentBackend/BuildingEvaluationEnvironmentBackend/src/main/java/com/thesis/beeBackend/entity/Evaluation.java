
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

    @Column(name = "year")
    private int year;

    @Column(name = "owner_email")
    private String ownerEmail;

    @Column(name = "energy_performance_score")
    private double energyPerformanceScore;

    @Column(name = "indoor_environmental_quality_score")
    private double indoorEnvironmentalQualityScore;

    @Column(name = "environment_circularity_score")
    private double environmentCircularityScore;

    @Column(name = "accessibility_score")
    private double accessibilityScore;

    @Column(name = "total_score")
    private double totalScore;
}