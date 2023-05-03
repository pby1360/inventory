package com.example.inventory.item.controller;

import com.example.inventory.item.dto.ItemDTO;
import com.example.inventory.item.dto.ItemRequest;
import com.example.inventory.item.dto.ItemResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @GetMapping
    public List<ItemResponse> getItemList(@RequestParam ItemRequest request) {
        return null;
    }

    @GetMapping("/{id}")
    public ItemResponse getItemDetail (@PathVariable Long id) {
        return null;
    }

    @PostMapping
    public ResponseEntity createItem (@RequestBody ItemDTO itemDto) {
        return null;
    }

    @PostMapping
    public ResponseEntity modifyItem (@RequestBody ItemDTO itemDto) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem (@PathVariable Long id) {
        return null;
    }
}
