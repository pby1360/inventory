package com.example.inventory.inventory.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventorySearch {
    private Long placeId;
    private Long storageId;
    private String itemType;
    private String itemName;
}
