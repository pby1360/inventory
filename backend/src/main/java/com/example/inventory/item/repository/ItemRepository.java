package com.example.inventory.item.repository;

import com.example.inventory.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByPlaceId(Long placeId);
    List<Item> findByPlaceIdIn(Long [] placeIds);
}
