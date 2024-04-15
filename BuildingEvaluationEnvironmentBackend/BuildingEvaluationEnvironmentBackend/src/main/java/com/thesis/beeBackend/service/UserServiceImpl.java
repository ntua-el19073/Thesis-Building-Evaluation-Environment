package com.thesis.beeBackend.service;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.thesis.beeBackend.entity.*;
import com.thesis.beeBackend.repository.*;
import com.thesis.beeBackend.dto.*;
import com.thesis.beeBackend.util.JwtTokenUtil;
import com.thesis.beeBackend.util.KeyGeneratorUtil;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private KeyGeneratorUtil keyGeneratorUtil;

    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<LoginResponseDTO> googleSignIn(UserDTO userDTO) {
        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        String message;
        if (existingUser != null) {
            message = "Sign-in successful";
        } else {
            createUser(userDTO, true);
            message = "New user created";
        }
        if (existingUser != null || message.equals("New user created")) {
            return ResponseEntity.ok(new LoginResponseDTO(message, generateToken(userDTO.getEmail(),userDTO.getUsername())));
        } 
        else {
            // Handle the case where user is not found and not created
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<LoginResponseDTO> login(UserDTO userDTO) {
        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser == null) {
            return ResponseEntity.badRequest().body(new LoginResponseDTO("The email you entered is not registered. Please make sure you've entered it correctly or sign up for a new account.", null));
        }        
        if (existingUser.getPassword() == null) {
            return ResponseEntity.badRequest().body(new LoginResponseDTO("This email has only been registered by signing in through Google. To enable signing in through this email, please sign up. Else try signing in with Google.", null));
        }
        if (!existingUser.getPassword().equals(userDTO.getPassword())) {
            return ResponseEntity.badRequest().body(new LoginResponseDTO("Wrong password", null));
        }
        // Generate JWT token (you need to implement this part)
        String jwtToken = generateToken(existingUser.getEmail(),existingUser.getUsername());
        
        // Return response with message and token
        return ResponseEntity.ok().body(new LoginResponseDTO("Sign-in successful", jwtToken));
    }



    //     return ((existingUser != null) ?
    //     (existingUser.getPassword() != null) ?
    //             (existingUser.getPassword().equals(userDTO.getPassword())) ?
    //                     "Sign-in successful" : "Wrong password" :
    //             "This email has only been registered by signing in through Google. To enable signing in through this email, please sign up. Else try signing in with Google." :
    //             "The email you entered is not registered. Please make sure you've entered it correctly or sign up for a new account.");
    // }

    public String signup(UserDTO userDTO){
        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser != null) {
            return "Sign-up unsuccessful: email is already being used";
        }
        else{
            createUser(userDTO, false);
            return "Sign-up successful: new user has been created"; 
        }
    }


    private void createUser(UserDTO userDTO, Boolean googlelog) {
        User newUser = User.builder()
                    .email(userDTO.getEmail())
                    .username(userDTO.getUsername())
                    .password(googlelog? null: userDTO.getPassword())
                    .googleLogin(googlelog)
                    .build();
        userRepository.save(newUser);
    }

    public String generateToken(String email, String username) {
        final SecretKey HS256_KEY = keyGeneratorUtil.updateHmacKey();
        return jwtTokenUtil.generateToken(email, username, HS256_KEY);
    }
}