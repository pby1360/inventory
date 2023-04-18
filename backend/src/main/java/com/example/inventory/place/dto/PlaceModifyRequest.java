package com.example.inventory.place.dto;

import com.example.inventory.place.entity.Place;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlaceModifyRequest {
    private Long id;
    private String userId;
    private String name;
    private String category;
    private String zipCode;
    private String address1;
    private String address2;
    private String contact;
    private String remark;

    public PlaceModifyRequest(String userId, String name, String category, String zipCode, String address1, String address2, String contact, String remark) {
        this.userId = userId;
        this.name = name;
        this.category = category;
        this.zipCode = zipCode;
        this.address1 = address1;
        this.address2 = address2;
        this.contact = contact;
        this.remark = remark;
    }

    public Place toEntity() {
        return Place.builder()
                .id(this.id)
                .name(this.name)
                .category(this.category)
                .address1(this.address1)
                .address2(this.address2)
                .zipCode(this.zipCode)
                .contact(this.contact)
                .remark(this.remark)
                .build();
    }
}
