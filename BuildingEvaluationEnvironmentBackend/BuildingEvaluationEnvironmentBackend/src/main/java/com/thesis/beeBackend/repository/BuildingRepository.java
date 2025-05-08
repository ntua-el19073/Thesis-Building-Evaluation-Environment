package com.thesis.beeBackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.thesis.beeBackend.entity.*;


public interface BuildingRepository extends JpaRepository<Building, Long> {
    List<Building> findAllByOwnerEmail(String ownerEmail);

    Optional<Building> findById(Long id);
}