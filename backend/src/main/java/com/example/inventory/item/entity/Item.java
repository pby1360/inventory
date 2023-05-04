package com.example.inventory.item.entity;

import com.example.inventory.common.entity.BaseEntity;
import com.example.inventory.common.enums.ItemType;
import com.example.inventory.place.entity.Place;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Item extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn
    private Place place;
    private ItemType type;
    private int price;
    private String unit;
    private String spec;

    private String remark;

    public Item(Long id, String name, Place place, ItemType type, int price, String unit, String spec, String remark) {
        this.id = id;
        this.name = name;
        this.place = place;
        this.type = type;
        this.price = price;
        this.unit = unit;
        this.spec = spec;
        this.remark = remark;
    }
}
