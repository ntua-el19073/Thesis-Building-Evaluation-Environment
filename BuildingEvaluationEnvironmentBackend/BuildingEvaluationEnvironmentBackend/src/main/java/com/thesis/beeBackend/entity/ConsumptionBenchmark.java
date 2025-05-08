package com.thesis.beeBackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "country_consumption_benchmarks")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsumptionBenchmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country", unique = true, nullable = false)
    private String country;

    @Column(name = "median_water_consumption", nullable = false)
    private int medianWaterConsumption;

    @Column(name = "median_energy_consumption", nullable = false)
    private int medianEnergyConsumption;

}