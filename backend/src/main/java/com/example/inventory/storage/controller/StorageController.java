package com.example.inventory.storage.controller;

import com.example.inventory.storage.dto.StorageDTO;
import com.example.inventory.storage.dto.StorageDetail;
import com.example.inventory.storage.dto.StorageRequest;
import com.example.inventory.storage.service.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/storages")
public class StorageController {

    private StorageService service;

    public StorageController(StorageService service) {
        this.service = service;
    }

    @GetMapping
    public List<StorageDTO> getList(StorageRequest dto) {
        return service.list(dto);
    }

    @GetMapping("/{id}")
    public StorageDetail getDetail(@PathVariable Long id) {
        return service.detail(id);
    }

    @PostMapping
    public ResponseEntity createStorage(@RequestBody StorageDTO dto) {
        try {
            service.create(dto);
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
    public ResponseEntity modifyStorage(@RequestBody StorageDTO dto) {
        try {
            service.modify(dto);
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
    public ResponseEntity deleteStorage(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
