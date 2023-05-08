package com.example.inventory.storage.dto;

import lombok.Data;

@Data
public class StorageRequest {
    private String storageName;
    private Long placeId;
}
