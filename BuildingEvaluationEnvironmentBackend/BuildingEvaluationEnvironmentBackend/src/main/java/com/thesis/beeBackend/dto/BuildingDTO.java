package com.thesis.beeBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDTO {
    private Long id;
    private String name;
    private String country;
    private String location;
    private String type;
    private int yearConstructed;
    private int floor;
    private int area;
    private String ownerEmail;
    private String imagePath;
}
