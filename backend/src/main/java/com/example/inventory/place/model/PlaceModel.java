package com.example.inventory.place.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
public class PlaceModel {
    private Long id;
    private String name;
    private String category;
    private String address1;
    private String address2;
    private String zipCode;
    private String contact;
    private String remark;

    private List<PlaceUserModel> placeUsers = new ArrayList<>();
}
