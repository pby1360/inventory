package com.example.inventory.item.controller;

import com.example.inventory.item.dto.ItemDTO;
import com.example.inventory.item.dto.ItemDetailResponse;
import com.example.inventory.item.dto.ItemRequest;
import com.example.inventory.item.dto.ItemResponse;
import com.example.inventory.item.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/items")
@Slf4j
public class ItemController {

    private ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<ItemResponse> getItemList(ItemRequest request) {
        log.info(request.toString());
        return service.list(request);
    }

    @GetMapping("/{id}")
    public ItemDetailResponse getItemDetail (@PathVariable Long id) {
        return service.detail(id);
    }

    @PostMapping
    public ResponseEntity createItem (@RequestBody ItemDTO itemDto) {
        log.info("itemDto ? {}", itemDto.toString());

        try {
            service.create(itemDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping
    public ResponseEntity modifyItem (@RequestBody ItemDTO itemDto) {
        try {
            service.modify(itemDto);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem (@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
