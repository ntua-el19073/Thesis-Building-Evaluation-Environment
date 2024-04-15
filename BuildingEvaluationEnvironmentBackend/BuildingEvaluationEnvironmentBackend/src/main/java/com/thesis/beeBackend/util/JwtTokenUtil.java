package com.thesis.beeBackend.util;

import io.jsonwebtoken.Jwts;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    public String generateToken(String email, String username, Key key) {
        Date expiryDate = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
        return Jwts.builder()
                .claim("email", email) // Custom claim for email
                .claim("username", username) // Custom claim for username
                .expiration(expiryDate) // Use expiration() instead of setExpiration()
                .signWith(key) //SignatureAlgorithm.HS256
                .compact();
    }
}




