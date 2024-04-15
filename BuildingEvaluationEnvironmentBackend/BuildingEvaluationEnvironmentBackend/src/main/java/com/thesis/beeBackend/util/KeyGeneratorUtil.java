package com.thesis.beeBackend.util;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

import java.security.SecureRandom;

@Component
public class KeyGeneratorUtil {

    private SecretKey hmacKey;

    @PostConstruct
    public void init() {
        // Initialize the HMAC key during bean initialization
        hmacKey = generateNewHmacKey();
    }

    public SecretKey getHmacKey() {
        return hmacKey;
    }

    public SecretKey updateHmacKey() {
        hmacKey = generateNewHmacKey();
        return  hmacKey;
    }

    private SecretKey generateNewHmacKey() {
        try {
            // Generate a random byte array for the key
            byte[] keyBytes = new byte[32]; // 256 bits for HS256
            SecureRandom secureRandom = new SecureRandom();
            secureRandom.nextBytes(keyBytes);

            // Create a SecretKey object using the key bytes
            return new SecretKeySpec(keyBytes, "HmacSHA256");
        } catch (RuntimeException e) {
            throw new RuntimeException("Error generating HMAC key", e);
        }
    }
}
 
