package com.example.inventory.item.service;

import com.example.inventory.item.dto.ItemDTO;
import com.example.inventory.item.dto.ItemDetailResponse;
import com.example.inventory.item.dto.ItemRequest;
import com.example.inventory.item.dto.ItemResponse;

import java.util.List;

public interface ItemService {

    List<ItemResponse> list(ItemRequest request);
    ItemDetailResponse detail(Long id);
    void create(ItemDTO itemDto);
    void modify(ItemDTO itemDto);
    void delete(Long id);
}
