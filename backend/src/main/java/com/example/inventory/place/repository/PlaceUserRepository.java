package com.example.inventory.place.repository;

import com.example.inventory.place.entity.PlaceUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceUserRepository extends JpaRepository<PlaceUser, Long> {
    List<PlaceUser> findByUserId(String userId);
}
