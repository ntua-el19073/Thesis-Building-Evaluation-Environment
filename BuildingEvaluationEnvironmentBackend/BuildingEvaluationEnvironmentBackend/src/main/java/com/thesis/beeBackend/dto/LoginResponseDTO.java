package com.thesis.beeBackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponseDTO {
    @JsonProperty("message") // Specify the JSON property name
    private String message;

    @JsonProperty("token") // Specify the JSON property name
    private String token;

    // Default constructor for Jackson
    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String message, String token) {
        this.message = message;
        this.token = token;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
