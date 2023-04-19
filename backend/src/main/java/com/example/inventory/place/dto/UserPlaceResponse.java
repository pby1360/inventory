package com.example.inventory.place.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserPlaceResponse {

    private Long placeUserId;
    private Long placeId;
    private String placeName;
    private String category;
    private String permission;
    private String userStatus;
    private String address;
    private int userCount;
}
