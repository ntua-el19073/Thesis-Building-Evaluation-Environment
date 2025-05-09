package com.thesis.beeBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.thesis.beeBackend.entity.*;
import com.thesis.beeBackend.dto.*;
import com.thesis.beeBackend.service.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserControllerImpl implements UserController {
    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/google-signin")
    // @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<LoginResponseDTO> googleSignIn(@RequestBody UserDTO userDTO) {
        // ResponseEntity<LoginResponseDTO> response =
        // userService.googleSignIn(userDTO);
        return userService.googleSignIn(userDTO);
    }

    @PostMapping("/login")
    // @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody UserDTO userDTO) {
        // ResponseEntity<LoginResponseDTO> response = userService.login(userDTO);
        return userService.login(userDTO);
    }

    @PostMapping("/signup")
    // @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> signup(@RequestBody UserDTO userDTO) {
        // String response = userService.signup(userDTO);
        return userService.signup(userDTO);
    }

}