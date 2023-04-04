package com.example.inventory.place.entity;

import com.example.inventory.common.entity.BaseEntity;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "place")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
@Setter(AccessLevel.PRIVATE)
public class Place extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private String address1;
    private String address2;
    private String zipCode;
    private String contact;
    private String remark;

    @OneToMany(mappedBy = "place")
//    @JoinColumn(name = "place_id", referencedColumnName = "id")
    private List<PlaceUser> placeUsers = new ArrayList<>();

}
