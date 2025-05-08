package com.thesis.beeBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thesis.beeBackend.entity.ConsumptionBenchmark;

public interface ConsumptionBenchmarkRepository extends JpaRepository<ConsumptionBenchmark, Long> {
    Optional<ConsumptionBenchmark> findByCountry(String country);
}