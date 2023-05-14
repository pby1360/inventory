package com.example.inventory.inventory.service.impl;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.common.DuplicateException;
import com.example.inventory.common.enums.ItemType;
import com.example.inventory.inventory.dto.InventoryDTO;
import com.example.inventory.inventory.dto.InventoryDetailDTO;
import com.example.inventory.inventory.dto.InventorySearch;
import com.example.inventory.inventory.dto.InventoryUseDTO;
import com.example.inventory.inventory.entity.Inventory;
import com.example.inventory.inventory.repository.InventoryRepository;
import com.example.inventory.inventory.service.InventoryService;
import com.example.inventory.item.entity.Item;
import com.example.inventory.item.repository.ItemRepository;
import com.example.inventory.place.entity.Place;
import com.example.inventory.place.repository.PlaceRepository;
import com.example.inventory.place.repository.PlaceUserRepository;
import com.example.inventory.storage.entity.Storage;
import com.example.inventory.storage.repository.StorageRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryServiceImpl implements InventoryService {

    private InventoryRepository repository;
    private StorageRepository storageRepository;
    private ItemRepository itemRepository;
    private PlaceRepository placeRepository;
    private PlaceUserRepository placeUserRepository;
    private AuthRepository authRepository;

    public InventoryServiceImpl(InventoryRepository repository, PlaceRepository placeRepository, PlaceUserRepository placeUserRepository, StorageRepository storageRepository, ItemRepository itemRepository, AuthRepository authRepository) {
        this.repository = repository;
        this.placeRepository = placeRepository;
        this.placeUserRepository = placeUserRepository;
        this.storageRepository = storageRepository;
        this.itemRepository = itemRepository;
        this.authRepository = authRepository;
    }

    @Override
    public List<InventoryDTO> list(InventorySearch search) {

        List<Inventory> inventories = new ArrayList<Inventory>();

        if (!ObjectUtils.isEmpty(search.getPlaceId())) {
            inventories = repository.findByPlaceId(search.getPlaceId());
        } else {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            Long [] placeIds = placeUserRepository.findByUserId(userId).stream().map(place -> place.getPlace().getId()).toArray(Long[]::new);
            inventories = repository.findByPlaceIdIn(placeIds);
        }

        if (!ObjectUtils.isEmpty(search.getStorageId())) {
            inventories = inventories.stream().filter(inventory -> inventory.getStorage().getId() == search.getStorageId()).collect(Collectors.toList());
        }

        if (!ObjectUtils.isEmpty(search.getItemType())) {
            inventories = inventories.stream().filter(inventory -> inventory.getItem().getType() == ItemType.of(search.getItemType())).collect(Collectors.toList());
        }

        if (!ObjectUtils.isEmpty(search.getItemName())) {
            inventories = inventories.stream().filter(inventory -> inventory.getItem().getName().contains(search.getItemName())).collect(Collectors.toList());
        }

        return inventories.stream().map(inventory -> InventoryDTO.toDto(inventory)).collect(Collectors.toList());
    }

    @Override
    public InventoryDetailDTO detail(Long id) {
        Inventory inventory = repository.findById(id).orElseThrow();
        Auth createUser = authRepository.findById(inventory.getCreatedBy()).orElse(new Auth());
        Auth modifyUser = authRepository.findById(inventory.getModifiedBy()).orElse(new Auth());
        return new InventoryDetailDTO(
                inventory.getId()
                , inventory.getPlace().getId(), inventory.getPlace().getName()
                , inventory.getStorage().getId(), inventory.getStorage().getName()
                , inventory.getItem().getId(), inventory.getItem().getName(), inventory.getItem().getType().getName()
                , inventory.getQuantity()
                , inventory.getCreatedBy(), createUser.getName(), inventory.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                , inventory.getModifiedBy(), modifyUser.getName(), inventory.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                , inventory.getRemark());
    }

    @Override
    public void create(InventoryDTO dto) throws DuplicateException {
        Place place = placeRepository.findById(dto.getPlaceId()).orElseThrow();
        Storage storage = storageRepository.findById(dto.getStorageId()).orElseThrow();
        Item item = itemRepository.findById(dto.getItemId()).orElseThrow();
        if (repository.existsInventoryByPlaceIdAndStorageIdAndItemId(dto.getPlaceId(), dto.getStorageId(), dto.getItemId())) {
            throw new DuplicateException("duplicated");
        }
        Inventory newInventory = new Inventory(null, place, storage, item, dto.getQuantity(), dto.getRemark());
        repository.save(newInventory);
    }

    @Override
    public void modify(InventoryDTO dto) {
        Inventory inventory = repository.findById(dto.getId()).orElseThrow();
        inventory.modify(dto);
        repository.save(inventory);
    }

    @Override
    public void useInventory(InventoryUseDTO dto) {
        Inventory inventory = repository.findById(dto.getId()).orElseThrow();
        inventory.use(dto);
        repository.save(inventory);
        /* 이력저장 로직 필요 */
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
