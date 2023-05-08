package com.example.inventory.storage.service.impl;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.common.enums.ItemType;
import com.example.inventory.item.dto.ItemResponse;
import com.example.inventory.item.entity.Item;
import com.example.inventory.place.entity.Place;
import com.example.inventory.place.entity.PlaceUser;
import com.example.inventory.place.repository.PlaceRepository;
import com.example.inventory.place.repository.PlaceUserRepository;
import com.example.inventory.storage.dto.StorageDTO;
import com.example.inventory.storage.dto.StorageDetail;
import com.example.inventory.storage.dto.StorageRequest;
import com.example.inventory.storage.entity.Storage;
import com.example.inventory.storage.repository.StorageRepository;
import com.example.inventory.storage.service.StorageService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StorageServiceImpl implements StorageService {
    private StorageRepository repository;
    private PlaceRepository placeRepository;
    private AuthRepository authRepository;
    private PlaceUserRepository placeUserRepository;

    public StorageServiceImpl(StorageRepository repository, PlaceRepository placeRepository, AuthRepository authRepository, PlaceUserRepository placeUserRepository) {
        this.repository = repository;
        this.placeRepository = placeRepository;
        this.authRepository = authRepository;
        this.placeUserRepository = placeUserRepository;
    }

    @Override
    public List<StorageDTO> list(StorageRequest request) {
        List<Storage> storages = new ArrayList<Storage>();

        if (ObjectUtils.isEmpty(request.getPlaceId())) {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            Long [] placeIds = placeUserRepository.findByUserId(userId).stream().map(place -> place.getPlace().getId()).toArray(Long[]::new);
            storages = repository.findByPlaceIdIn(placeIds);
        } else {
            storages = repository.findByPlaceId(request.getPlaceId());
        }

        if (!ObjectUtils.isEmpty(request.getStorageName())) {
            storages = storages.stream().filter(storage -> storage.getName().contains(request.getStorageName())).collect(Collectors.toList());
        }

        return storages.stream().map(storage -> StorageDTO.toDto(storage)).collect(Collectors.toList());
    }

    @Override
    public StorageDetail detail(Long id) {
        Storage storage = repository.findById(id).orElseThrow();
        Auth createUser = authRepository.findById(storage.getCreatedBy()).orElse(new Auth());
        Auth modifyUser = authRepository.findById(storage.getModifiedBy()).orElse(new Auth());
        return new StorageDetail(
                storage.getId(), storage.getName()
                , storage.getPlace().getId(), storage.getPlace().getName()
                , storage.getCreatedBy(), createUser.getName()
                , storage.getModifiedBy(), modifyUser.getName()
                , storage.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), storage.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                , storage.getRemark());
    }

    @Override
    public void create(StorageDTO dto) {
        Place place = placeRepository.findById(dto.getPlaceId()).orElseThrow();
        Storage newStorage = new Storage(null, dto.getName(), place, dto.getRemark());
        repository.save(newStorage);
    }

    @Override
    public void modify(StorageDTO dto) {
        Storage storage = repository.findById(dto.getId()).orElseThrow();
        storage.modify(dto);
        repository.save(storage);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
