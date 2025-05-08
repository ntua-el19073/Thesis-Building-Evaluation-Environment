package com.thesis.beeBackend.controller;

import com.thesis.beeBackend.dto.*;
import org.springframework.http.ResponseEntity;

public interface UserController {

    ResponseEntity<LoginResponseDTO> googleSignIn(UserDTO userDTO);

    ResponseEntity<LoginResponseDTO> login(UserDTO userDTO);

    ResponseEntity<String> signup(UserDTO userDTO);

    //ResponseEntity<String> testEndpoint();

}
