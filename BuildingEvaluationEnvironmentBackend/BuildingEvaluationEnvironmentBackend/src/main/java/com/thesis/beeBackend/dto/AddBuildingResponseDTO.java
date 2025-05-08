package com.thesis.beeBackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddBuildingResponseDTO {
    @JsonProperty("building")
    private BuildingDTO buildingDTO;

    @JsonProperty("message")
    private String message;
}
