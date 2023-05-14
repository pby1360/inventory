package com.example.inventory.inventory.controller;

import com.example.inventory.common.DuplicateException;
import com.example.inventory.inventory.dto.InventoryDTO;
import com.example.inventory.inventory.dto.InventoryDetailDTO;
import com.example.inventory.inventory.dto.InventorySearch;
import com.example.inventory.inventory.dto.InventoryUseDTO;
import com.example.inventory.inventory.service.InventoryService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/inventories")
public class InventoryController {

    private InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }
    @GetMapping
    public List<InventoryDTO> getList(InventorySearch search) {
        return service.list(search);
    }

    @GetMapping("/{id}")
    public InventoryDetailDTO getDetail(@PathVariable Long id) {
        return service.detail(id);
    }

    @PostMapping
    public ResponseEntity createInventory(@RequestBody InventoryDTO dto) {
        try {
            service.create(dto);
            return ResponseEntity.status((HttpStatus.CREATED)).body(null);
        } catch (DuplicateException e) {
            e.printStackTrace();
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(null);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status((HttpStatus.CONFLICT)).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status((HttpStatus.INTERNAL_SERVER_ERROR)).body(null);
        }
    }

    @PutMapping
    public ResponseEntity modifyInventory(@RequestBody InventoryDTO dto) {
        try {
            service.modify(dto);
            return ResponseEntity.status((HttpStatus.OK)).body(null);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status((HttpStatus.CONFLICT)).body(null);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.INTERNAL_SERVER_ERROR)).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity useInventory(@PathVariable Long id, @RequestBody InventoryUseDTO dto) {
        try {
            service.useInventory(dto);
            return ResponseEntity.status((HttpStatus.OK)).body(null);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status((HttpStatus.CONFLICT)).body(null);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.INTERNAL_SERVER_ERROR)).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteInventory(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.status((HttpStatus.OK)).body(null);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status((HttpStatus.CONFLICT)).body(null);
        } catch (Exception e) {
            return ResponseEntity.status((HttpStatus.INTERNAL_SERVER_ERROR)).body(null);
        }
    }

//    @GetMapping("/{id}/history")
//    public List<InventoryHistoryDTO> getHistory(@PathVariable Long id) {
//        return ResponseEntity.status((HttpStatus.CREATED)).body(null);
//    }
}
