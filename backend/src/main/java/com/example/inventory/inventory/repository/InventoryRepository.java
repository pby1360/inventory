package com.example.inventory.inventory.repository;

import com.example.inventory.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByPlaceId(Long placeId);
    List<Inventory> findByPlaceIdIn(Long [] placeIds);

    boolean existsInventoryByPlaceIdAndStorageIdAndItemId(Long placeId, Long storageId, Long itemId);
}
