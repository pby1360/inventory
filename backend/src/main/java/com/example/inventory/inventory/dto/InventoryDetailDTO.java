package com.example.inventory.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InventoryDetailDTO {
    private Long id;
    private Long placeId;
    private String placeName;
    private Long StorageId;
    private String storageName;
    private Long itemId;
    private String itemName;
    private String itemType;
    private int quantity;
    private String createUser;
    private String createUserName;
    private String createdAt;
    private String modifyUser;
    private String modifyUserName;
    private String modifiedAt;
    private String remark;
}
