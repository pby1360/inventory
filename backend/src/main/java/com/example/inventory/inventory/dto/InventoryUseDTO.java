package com.example.inventory.inventory.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryUseDTO {
    private Long id;
    private int quantity;
    private String useType;
}
