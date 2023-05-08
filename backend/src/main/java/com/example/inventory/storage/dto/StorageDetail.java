package com.example.inventory.storage.dto;

import com.example.inventory.common.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StorageDetail {
    private Long id;
    private String name;
    private Long placeId;
    private String placeName;
    private String createUserId;
    private String createUserName;
    private String modifyUserId;
    private String modifyUserName;
    private String createdAt;
    private String modifiedAt;
    private String remark;
}
