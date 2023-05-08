package com.example.inventory.storage.repository;

import com.example.inventory.storage.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StorageRepository extends JpaRepository<Storage, Long> {
    List<Storage> findByPlaceIdIn(Long[] placeIds);
    List<Storage> findByPlaceId(Long placeId);
}
