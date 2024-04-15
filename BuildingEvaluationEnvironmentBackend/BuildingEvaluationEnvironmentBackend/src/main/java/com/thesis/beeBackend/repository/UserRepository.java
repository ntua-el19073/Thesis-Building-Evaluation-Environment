package com.thesis.beeBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.thesis.beeBackend.entity.*;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}