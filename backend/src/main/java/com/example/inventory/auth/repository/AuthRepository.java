package com.example.inventory.auth.repository;

import com.example.inventory.auth.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, String> {
}
