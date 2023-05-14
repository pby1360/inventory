package com.example.inventory.inventory.service;

import com.example.inventory.common.DuplicateException;
import com.example.inventory.inventory.dto.InventoryDTO;
import com.example.inventory.inventory.dto.InventoryDetailDTO;
import com.example.inventory.inventory.dto.InventorySearch;
import com.example.inventory.inventory.dto.InventoryUseDTO;

import java.util.List;

public interface InventoryService {
    List<InventoryDTO> list(InventorySearch search);
    InventoryDetailDTO detail(Long id);
    void create(InventoryDTO dto) throws DuplicateException;
    void modify(InventoryDTO dto);
    void useInventory(InventoryUseDTO dto);
    void delete(Long id);
//    List<InventoryHistoryDTO> historyList(Long id);
}
