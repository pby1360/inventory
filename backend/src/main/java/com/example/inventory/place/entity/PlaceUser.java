package com.example.inventory.place.entity;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.common.entity.BaseEntity;
import com.example.inventory.common.enums.UserPlaceStatus;
import com.example.inventory.common.enums.UserPermission;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import javax.persistence.*;

@Entity
@Table(name = "place_user")
@Getter
@NoArgsConstructor
public class PlaceUser extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    //    private String userId;
    private Auth user;

    private UserPlaceStatus status;

    private UserPermission permission;

    @ManyToOne
    @JoinColumn
//    @JoinColumn(name = "place_id", insertable = false, updatable = false)
    private Place place;

    public PlaceUser(Auth user, Place place,UserPlaceStatus status, UserPermission permission) {
//        this.userId = userId;
        this.user = user;
        this.place = place;
        this.status = status;
        this.permission = permission;
    }

    public PlaceUser modifyUser(String permission, String status) {
        if (StringUtils.hasText(permission)) {
            this.permission = UserPermission.of(permission);
        }
        if (StringUtils.hasText(status)) {
            this.status = UserPlaceStatus.of(status);
        }
        return this;
    }
}
