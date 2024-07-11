package com.thesis.beeBackend.controller;

import com.thesis.beeBackend.dto.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public interface BuildingsController {

    ResponseEntity<List<BuildingDTO>> getBuildingsData (String email);

    ResponseEntity<AddBuildingResponseDTO> addBuilding( BuildingDTO buildingDTO); 

    ResponseEntity<String> removeBuilding (Long id);

    ResponseEntity<String> updateBuilding( BuildingDTO buildingDTO);

}
