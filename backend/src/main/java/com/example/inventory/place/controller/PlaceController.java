package com.example.inventory.place.controller;

import com.example.inventory.place.dto.PlaceCreationRequest;
import com.example.inventory.place.dto.UserPlacesResponse;
import com.example.inventory.place.entity.PlaceUser;
import com.example.inventory.place.model.PlaceModel;
import com.example.inventory.place.model.PlaceUserModel;
import com.example.inventory.place.service.PlaceSerivce;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/places")
@Slf4j
public class PlaceController {

    private PlaceSerivce service;

    public PlaceController(PlaceSerivce service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public PlaceModel getPlaces (@PathVariable Long id) {
        return service.getPlaces(id);
    }

    @GetMapping
    public List<UserPlacesResponse> getPlacesByUser () {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return service.getPlacesByUser(userId)
                .stream()
                .map(placeUser -> UserPlacesResponse
                        .builder()
                        .placeId(placeUser.getPlaceId())
                        .placeName(placeUser.getPlace().getName())
                        .category(placeUser.getPlace().getCategory())
                        .permission(placeUser.getPermission())
                        .userStatus(placeUser.getStatus())
                        .address(placeUser.getPlace().getAddress1())
                        .userCount(placeUser.getPlace().getPlaceUsers().size())
                        .build()
                ).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity createPlace(@RequestBody PlaceCreationRequest request) {
        log.info(request.toString());
        service.createPlace(request.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
