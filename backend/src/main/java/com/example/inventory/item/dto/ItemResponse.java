package com.example.inventory.item.dto;

import com.example.inventory.common.enums.ItemType;
import com.example.inventory.item.entity.Item;

import java.time.format.DateTimeFormatter;

public class ItemResponse {

    private Long id;
    private String name;
    private Long placeId;
    private String placeName;
    private String type;
    private String unit;
    private int price;
    private String spec;

    public ItemResponse(Long id, String name, Long placeId, String placeName, String type, String unit, int price, String spec) {
        this.id = id;
        this.name = name;
        this.placeId = placeId;
        this.placeName = placeName;
        this.type = type;
        this.unit = unit;
        this.price = price;
        this.spec = spec;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public static ItemResponse toDto(Item item) {
        return new ItemResponse(item.getId(), item.getName(), item.getPlace().getId(), item.getPlace().getName(), item.getType().getName(), item.getUnit(), item.getPrice(), item.getSpec());
    }
}
