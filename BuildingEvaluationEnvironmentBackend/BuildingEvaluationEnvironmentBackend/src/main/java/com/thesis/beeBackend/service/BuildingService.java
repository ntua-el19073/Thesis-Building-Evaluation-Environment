package com.thesis.beeBackend.service;

import com.thesis.beeBackend.dto.AddBuildingResponseDTO;
import com.thesis.beeBackend.dto.BuildingDTO;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

public interface BuildingService {
    List<BuildingDTO> getBuildingsByEmail(String userEmail);

    ResponseEntity<AddBuildingResponseDTO> addBuilding(BuildingDTO buildingDTO, MultipartFile image);

    ResponseEntity<String> removeBuilding(Long id);

    ResponseEntity<String> updateBuilding(BuildingDTO buildingDTO, MultipartFile image);
}