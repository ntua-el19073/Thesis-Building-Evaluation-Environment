package com.thesis.beeBackend.service;

import com.thesis.beeBackend.dto.AddBuildingResponseDTO;
import com.thesis.beeBackend.dto.BuildingDTO;
import com.thesis.beeBackend.entity.Building;
import com.thesis.beeBackend.repository.BuildingRepository;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BuildingServiceImpl implements BuildingService{

    @Autowired
    private BuildingRepository buildingRepository;
    private static final Logger logger = LoggerFactory.getLogger(BuildingServiceImpl.class);


    public List<BuildingDTO> getBuildingsByEmail(String userEmail) {
        List<Building> buildings = buildingRepository.findAllByOwnerEmail(userEmail);
        return buildings.stream()
                .map(this::mapBuildingToDTO)
                .collect(Collectors.toList());
    }
    
    public ResponseEntity<AddBuildingResponseDTO> addBuilding(BuildingDTO buildingDTO) {
        try {
            Building building = mapDTOToBuilding(buildingDTO);
            buildingRepository.save(building);
            return ResponseEntity.ok().body(new AddBuildingResponseDTO(buildingDTO, "Building added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<String> removeBuilding(Long id) {
        try {
            buildingRepository.deleteById(id);
            return ResponseEntity.ok("Building with ID " + id + " deleted successfully");
        } catch (Exception e) {
            //throw new IllegalArgumentException("Failed to delete building with ID " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<String> updateBuilding(BuildingDTO buildingDTO) {
        Building existingBuilding = buildingRepository.findById(buildingDTO.getId())
                .orElseThrow(() -> new RuntimeException("Building not found with id " + buildingDTO.getId()));
        existingBuilding.setName(buildingDTO.getName());
        existingBuilding.setCountry(buildingDTO.getCountry());
        existingBuilding.setLocation(buildingDTO.getLocation());
        existingBuilding.setType(buildingDTO.getType());
        existingBuilding.setYearConstructed(buildingDTO.getYearConstructed());
        existingBuilding.setFloor(buildingDTO.getFloor());
        existingBuilding.setArea(buildingDTO.getArea());
        try{
            buildingRepository.save(existingBuilding);
            return ResponseEntity.ok("Building with ID " + buildingDTO.getId() + " updated successfully");
        }catch (Exception e) {
            //throw new IllegalArgumentException("Failed to delete building with ID " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    private BuildingDTO mapBuildingToDTO(Building building) {
        return new BuildingDTO(
                building.getId(),
                building.getName(),
                building.getCountry(),
                building.getLocation(),
                building.getType(),
                building.getYearConstructed(),
                building.getFloor(),
                building.getArea(),
                building.getOwnerEmail()
        );
    }

    private Building mapDTOToBuilding(BuildingDTO buildingDTO) {

        Building building = Building.builder()
            .name(buildingDTO.getName())
            .country(buildingDTO.getCountry())
            .location(buildingDTO.getLocation())
            .type(buildingDTO.getType())
            .yearConstructed(buildingDTO.getYearConstructed())
            .floor(buildingDTO.getFloor())
            .area(buildingDTO.getArea())
            .ownerEmail(buildingDTO.getOwnerEmail())
            .build();
        return building;
    }
    
    
}
