package com.example.inventory.item.service.impl;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.common.enums.ItemType;
import com.example.inventory.item.dto.ItemDTO;
import com.example.inventory.item.dto.ItemDetailResponse;
import com.example.inventory.item.dto.ItemRequest;
import com.example.inventory.item.dto.ItemResponse;
import com.example.inventory.item.entity.Item;
import com.example.inventory.item.repository.ItemRepository;
import com.example.inventory.item.service.ItemService;
import com.example.inventory.place.entity.Place;
import com.example.inventory.place.repository.PlaceRepository;
import com.example.inventory.place.repository.PlaceUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ItemServiceImpl implements ItemService {

    private ItemRepository repository;
    private PlaceRepository placeRepository;
    private PlaceUserRepository placeUserRepository;
    private AuthRepository authRepository;

    public ItemServiceImpl(ItemRepository repository, PlaceRepository placeRepository, PlaceUserRepository placeUserRepository, AuthRepository authRepository) {
        this.repository = repository;
        this.placeRepository = placeRepository;
        this.placeUserRepository = placeUserRepository;
        this.authRepository = authRepository;
    }

    @Override
    public List<ItemResponse> list(ItemRequest request) {
        List<Item> items = new ArrayList<Item>();

        if (ObjectUtils.isEmpty(request.getPlaceId())) {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            Long [] placeIds = placeUserRepository.findByUserId(userId).stream().map(place -> place.getPlace().getId()).toArray(Long[]::new);
            items = repository.findByPlaceIdIn(placeIds);
        } else {
            items = repository.findByPlaceId(request.getPlaceId());
        }

        if (!ObjectUtils.isEmpty(request.getItemType())) {
            items = items.stream().filter(item -> item.getType() == ItemType.of(request.getItemType())).collect(Collectors.toList());
        }

        if (!ObjectUtils.isEmpty(request.getItemName())) {
            items = items.stream().filter(item -> item.getName().contains(request.getItemName())).collect(Collectors.toList());
        }

        return items.stream().map(item -> ItemResponse.toDto(item)).collect(Collectors.toList());
    }

    @Override
    public ItemDetailResponse detail(Long id) {

        Item item = repository.findById(id).orElseThrow();
        Auth createUser = authRepository.findById(item.getCreatedBy()).orElse(new Auth());
        Auth modifyUser = authRepository.findById(item.getModifiedBy()).orElse(new Auth());

        ItemDetailResponse detail = new ItemDetailResponse(item.getId(), item.getName(), item.getPlace().getId(), item.getPlace().getName(), item.getType().getName(), item.getUnit(), item.getPrice(), item.getSpec(), item.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), item.getCreatedBy(), item.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), item.getModifiedBy()
                , createUser.getName()
                , modifyUser.getName()
                , item.getRemark());

        return detail;
    }

    @Override
    public void create(ItemDTO itemDto) {
        Place place= placeRepository.findById(itemDto.getPlaceId()).orElseThrow();
        Item newItem = new Item(null, itemDto.getName(), place, ItemType.of(itemDto.getType()), itemDto.getPrice(), itemDto.getUnit(), itemDto.getSpec(), itemDto.getRemark());
        repository.save(newItem);
    }

    @Override
    public void modify(ItemDTO itemDto) {
        Item item = repository.findById(itemDto.getId()).orElseThrow();
        item.modify(itemDto);
        repository.save(item);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
