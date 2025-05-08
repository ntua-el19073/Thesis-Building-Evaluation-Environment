package com.thesis.beeBackend.service;

import com.thesis.beeBackend.dto.AddBuildingResponseDTO;
import com.thesis.beeBackend.dto.BuildingDTO;
import com.thesis.beeBackend.entity.Building;
import com.thesis.beeBackend.repository.BuildingRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BuildingServiceImpl implements BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;
    private static final Logger logger = LoggerFactory.getLogger(BuildingServiceImpl.class);

    @Value("${image.storage.path}")
    private String imageStoragePath;

    public List<BuildingDTO> getBuildingsByEmail(String userEmail) {
        List<Building> buildings = buildingRepository.findAllByOwnerEmail(userEmail);
        return buildings.stream()
                .map(this::mapBuildingToDTO)
                .collect(Collectors.toList());
    }

    public ResponseEntity<AddBuildingResponseDTO> addBuilding(BuildingDTO buildingDTO, MultipartFile image) {
        try {
            Building building = mapDTOToBuilding(buildingDTO);

            if (image != null && !image.isEmpty()) {
                // Save the image file
                String imagePath = saveImage(image);
                building.setImagePath(imagePath);
            }
            buildingRepository.save(building);

            return ResponseEntity.ok().body(new AddBuildingResponseDTO(buildingDTO, "Building added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String saveImage(MultipartFile image) throws IOException {
        String fileName = generateUniqueFileName(image.getOriginalFilename());
        // Saving to local file system
        Path path = Paths.get(imageStoragePath + fileName);
        Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    private String generateUniqueFileName(String originalFileName) {
        // Generate a unique file name
        return UUID.randomUUID().toString() + "_" + originalFileName;
    }

    public ResponseEntity<String> removeBuilding(Long id) {
        try {
            Optional<Building> buildingOptional = buildingRepository.findById(id);
            if (buildingOptional.isPresent()) {
                Building building = buildingOptional.get();
                String fileName = building.getImagePath();
                Path path = Paths.get(imageStoragePath + fileName);
                Files.deleteIfExists(path);
            }
            buildingRepository.deleteById(id);
            return ResponseEntity.ok("Building with ID " + id + " deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<String> updateBuilding(BuildingDTO buildingDTO, MultipartFile image) {
        Building existingBuilding = buildingRepository.findById(buildingDTO.getId())
                .orElseThrow(() -> new RuntimeException("Building not found with id " + buildingDTO.getId()));
        existingBuilding.setName(buildingDTO.getName());
        existingBuilding.setCountry(buildingDTO.getCountry());
        existingBuilding.setLocation(buildingDTO.getLocation());
        existingBuilding.setType(buildingDTO.getType());
        existingBuilding.setYearConstructed(buildingDTO.getYearConstructed());
        existingBuilding.setFloor(buildingDTO.getFloor());
        existingBuilding.setArea(buildingDTO.getArea());
        try {
            if (image != null && !image.isEmpty()) {
                // Delete the previous image
                String fileName = existingBuilding.getImagePath();
                if (fileName != null) {
                    Path path = Paths.get(imageStoragePath + fileName);
                    Files.deleteIfExists(path);
                }
                // Save the image file
                String imagePath = saveImage(image);
                existingBuilding.setImagePath(imagePath);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        try {
            buildingRepository.save(existingBuilding);
            return ResponseEntity.ok("Building with ID " + buildingDTO.getId() + " updated successfully");
        } catch (Exception e) {
            // throw new IllegalArgumentException("Failed to delete building with ID " + id,
            // e);
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
                building.getOwnerEmail(),
                building.getImagePath());
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
