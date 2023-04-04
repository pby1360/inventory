package com.example.inventory.place.entity;

import com.example.inventory.common.entity.BaseEntity;
import com.example.inventory.common.enums.UserPlaceStatus;
import com.example.inventory.common.enums.UserPermission;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "place_user")
@Getter
@NoArgsConstructor
public class PlaceUser extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private UserPlaceStatus status;

    private UserPermission permission;

    @ManyToOne
    @JoinColumn(name = "place_id", insertable = false, updatable = false)
    private Place place;

    public PlaceUser(String userId, Long placeId, UserPlaceStatus status, UserPermission permission) {
        this.userId = userId;
        this.status = status;
        this.permission = permission;
    }
}
