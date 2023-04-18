package com.example.inventory.place.dto;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PlaceUserDTO {
    private Long id;
    private String userId;
    private String userName;
    private String phoneNumber;
    private Long placeId;
    private String status;
    private String permission;
    private String createAt;
    private PlaceDTO place;

    public PlaceUserDTO(Long id, String userId, String userName, String phoneNumber, Long placeId, String status, String permission, LocalDateTime createAt, PlaceDTO place) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.placeId = placeId;
        this.status = status;
        this.permission = permission;
        this.createAt = createAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.place = place;
    }
}
