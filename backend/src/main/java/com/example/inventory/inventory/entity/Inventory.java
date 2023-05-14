package com.example.inventory.inventory.entity;

import com.example.inventory.common.entity.BaseEntity;
import com.example.inventory.inventory.dto.InventoryDTO;
import com.example.inventory.inventory.dto.InventoryUseDTO;
import com.example.inventory.item.entity.Item;
import com.example.inventory.place.entity.Place;
import com.example.inventory.storage.entity.Storage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Inventory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn
    private Place place;
    @ManyToOne
    @JoinColumn
    private Storage storage;

    @ManyToOne
    @JoinColumn
    private Item item;

    private int quantity;
    private String remark;

    public void modify (InventoryDTO dto) {
        this.quantity = dto.getQuantity();
        this.remark = dto.getRemark();
    }

    public void use (InventoryUseDTO dto) {
        this.quantity = this.quantity + dto.getQuantity();
    }
}
