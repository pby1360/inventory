package com.example.inventory.place.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PlaceUserModel {
    private Long id;
    private String userId;
    private Long placeId;
    private String status;
    private String permission;
    private PlaceModel place;
}
