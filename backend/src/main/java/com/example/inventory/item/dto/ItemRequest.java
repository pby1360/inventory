package com.example.inventory.item.dto;

import lombok.Data;

@Data
public class ItemRequest {
    private Long placeId;
    private String itemType;
    private String itemName;
}
