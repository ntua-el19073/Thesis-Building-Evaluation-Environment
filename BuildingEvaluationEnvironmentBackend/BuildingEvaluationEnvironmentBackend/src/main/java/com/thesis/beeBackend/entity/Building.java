package com.thesis.beeBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "buildings", uniqueConstraints = { @UniqueConstraint(columnNames = { "ownerEmail", "name" }) })
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "country")
    private String country;

    @Column(name = "location")
    private String location;

    @Column(name = "type")
    private String type;

    @Column(name = "year_constructed")
    private int yearConstructed;

    @Column(name = "floor")
    private int floor;

    @Column(name = "area")
    private int area;

    @Column(name = "owner_email")
    private String ownerEmail;

    @Column(name = "image_path")
    private String imagePath;

    // Getters and setters
}
