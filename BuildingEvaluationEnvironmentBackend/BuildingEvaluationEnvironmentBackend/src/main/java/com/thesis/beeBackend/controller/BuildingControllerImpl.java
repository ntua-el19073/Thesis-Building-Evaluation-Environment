package com.thesis.beeBackend.controller;

import com.thesis.beeBackend.dto.AddBuildingResponseDTO;
import com.thesis.beeBackend.dto.BuildingDTO;
import com.thesis.beeBackend.entity.Building;
import com.thesis.beeBackend.entity.Evaluation;
import com.thesis.beeBackend.service.BuildingService;
import com.thesis.beeBackend.service.EvaluationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingControllerImpl implements BuildingsController{

    @Autowired
    private BuildingService buildingService;
    @Autowired
    private EvaluationService evaluationService;


    private static final Logger logger = LoggerFactory.getLogger(BuildingsController.class);

    @GetMapping("/get")
    public ResponseEntity<List<BuildingDTO>> getBuildingsData(@RequestParam String email) {
        try {
            return ResponseEntity.ok().body(buildingService.getBuildingsByEmail(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<AddBuildingResponseDTO> addBuilding(@RequestBody BuildingDTO buildingDTO) {
        //ResponseEntity<AddBuildingResponseDTO> response= buildingService.addBuilding(buildingDTO); 
        return (buildingService.addBuilding(buildingDTO));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> removeBuilding(@RequestParam Long id) {
        //ResponseEntity<String> response= buildingService.removeBuilding(id); 
        return (buildingService.removeBuilding(id));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateBuilding(@RequestBody BuildingDTO buildingDTO) {
        return (buildingService.updateBuilding(buildingDTO));
    }
}
