package com.encora.taskmanager.dto;

public class LoginResponseDto {
    private String token;

    // Constructor
    public LoginResponseDto(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }
}