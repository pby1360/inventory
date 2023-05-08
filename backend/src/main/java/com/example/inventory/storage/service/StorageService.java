package com.example.inventory.storage.service;

import com.example.inventory.storage.dto.StorageDTO;
import com.example.inventory.storage.dto.StorageDetail;
import com.example.inventory.storage.dto.StorageRequest;

import java.util.List;

public interface StorageService {

    List<StorageDTO> list(StorageRequest dto);
    StorageDetail detail(Long id);
    void create(StorageDTO dto);
    void modify(StorageDTO dto);
    void delete(Long id);
}
