package com.example.inventory.storage.dto;

import com.example.inventory.common.enums.ItemType;
import com.example.inventory.storage.entity.Storage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StorageDTO {

    private Long id;
    private String name;
    private Long placeId;
    private String placeName;
    private String remark;

    public static StorageDTO toDto(Storage storage) {
        return new StorageDTO(storage.getId(), storage.getName(), storage.getPlace().getId(), storage.getPlace().getName(), storage.getRemark());
    }

}

