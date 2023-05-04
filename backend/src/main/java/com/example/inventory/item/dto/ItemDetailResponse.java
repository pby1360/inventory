package com.example.inventory.item.dto;

import com.example.inventory.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemDetailResponse {

    private Long id;
    private String name;
    private Long placeId;
    private String placeName;
    private String type;
    private String unit;
    private int price;
    private String spec;
    private String createdAt;
    private String createdBy;
    private String modifiedAt;
    private String modifiedBy;
    private String createUserName;
    private String modifyUserName;

    private String remark;

//    public ItemDetailResponse(Long id, String name, Long placeId, String placeName, String type, String unit, int price, String spec, String createdAt, String createdBy, String modifiedAt, String modifiedBy, String createUserName, String modifyUserName, String remark) {
//        this.id = id;
//        this.name = name;
//        this.placeId = placeId;
//        this.placeName = placeName;
//        this.type = type;
//        this.unit = unit;
//        this.price = price;
//        this.spec = spec;
//        this.createdAt = createdAt;
//        this.createdBy = createdBy;
//        this.modifiedAt = modifiedAt;
//        this.modifiedBy = modifiedBy;
//        this.createUserName = createUserName;
//        this.modifyUserName = modifyUserName;
//        this.remark = remark;
//    }
}
