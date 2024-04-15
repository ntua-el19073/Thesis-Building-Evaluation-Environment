package com.thesis.beeBackend.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.thesis.beeBackend.dto.*;
import com.thesis.beeBackend.entity.User;

public interface UserService {

    User getUserByEmail(String email);

    ResponseEntity<LoginResponseDTO> googleSignIn(UserDTO userDTO);

    ResponseEntity<LoginResponseDTO> login(UserDTO userDTO);

    String signup(UserDTO userDTO);
}