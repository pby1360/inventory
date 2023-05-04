package com.example.inventory.item.dto;

import lombok.Data;
@Data
public class ItemDTO {
    private Long id;
    private Long placeId;
    private String name;
    private String type;
    private int price;
    private String unit;
    private String spec;
    private String remark;
}
