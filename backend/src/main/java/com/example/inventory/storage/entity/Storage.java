package com.example.inventory.storage.entity;

import com.example.inventory.common.entity.BaseEntity;
import com.example.inventory.place.entity.Place;
import com.example.inventory.storage.dto.StorageDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Storage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn
    private Place place;
    private String remark;

    public Storage(Long id, String name, Place place, String remark) {
        this.id = id;
        this.name = name;
        this.place = place;
        this.remark = remark;
    }

    public void modify(StorageDTO dto) {
        this.name = dto.getRemark();
        this.remark = dto.getRemark();
    }
}
