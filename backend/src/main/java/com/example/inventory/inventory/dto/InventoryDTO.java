package com.example.inventory.inventory.dto;

import com.example.inventory.inventory.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {
    private Long id;
    private Long placeId;
    private String placeName;
    private Long StorageId;
    private String storageName;
    private Long itemId;
    private String itemName;
    private String itemType;
    private int quantity;

    private String remark;

    public static InventoryDTO toDto(Inventory inventory) {
        return new InventoryDTO(
                inventory.getId()
                , inventory.getPlace().getId(), inventory.getPlace().getName()
                , inventory.getStorage().getId(), inventory.getStorage().getName()
                ,inventory.getItem().getId(), inventory.getItem().getName(), inventory.getItem().getType().getName()
                , inventory.getQuantity(), inventory.getRemark());
    }
}
