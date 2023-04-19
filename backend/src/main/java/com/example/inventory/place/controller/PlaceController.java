package com.example.inventory.place.controller;

import com.example.inventory.common.DuplicateException;
import com.example.inventory.place.dto.*;
import com.example.inventory.place.service.PlaceSerivce;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
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
    public PlaceDetailResponse getPlaceDetail (@PathVariable Long id) {
        PlaceDTO place = service.getPlaceDetail(id);
        return new PlaceDetailResponse(place.getId(), place.getName(),place.getCategory(), place.getAddress1(), place.getAddress2(), place.getZipCode(), place.getContact(), place.getRemark(), place.getPlaceUsers());
    }

    @GetMapping
    public List<UserPlaceResponse> getPlacesByUser () {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return service.getPlacesByUser(userId)
                .stream()
                .map(placeUser -> UserPlaceResponse
                        .builder()
                        .placeUserId(placeUser.getId())
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

    @PutMapping
    public ResponseEntity modifyPlace(@RequestBody PlaceModifyRequest request) {
        log.info(request.toString());

        PlaceModifyDTO dto = PlaceModifyDTO
                .builder()
                .id(request.getId())
                .name(request.getName())
                .contact(request.getContact())
                .zipCode(request.getZipCode())
                .address1(request.getAddress1())
                .address2(request.getAddress2())
                .category(request.getCategory())
                .remark(request.getRemark())
                .userId(request.getUserId())
                .build();

        try {
            service.modifyPlace(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}/users")
    public List<PlaceUserDTO> getPlaceUsers (@PathVariable Long id) {
        return service.getPlaceUsers(id);
    }

    @PutMapping("/{id}/users/{placeUserId}")
    public ResponseEntity modifyPlaceUser (@PathVariable Long id, @PathVariable Long placeUserId, @RequestBody PlaceUserDTO placeUser) {
        try {
            service.modifyPlaceUser(placeUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}/users/{placeUserId}/accept")
    public ResponseEntity acceptInvitation (@PathVariable Long id, @PathVariable Long placeUserId) {
        try {
            service.updateUserStatus(placeUserId, "inUse");
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity invitePlaceUser (@PathVariable Long id, @RequestBody PlaceUserDTO user) {

        try {
            service.addUSer(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (DuplicateException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}/users/{placeUserId}")
    public ResponseEntity removeUser (@PathVariable Long id, @PathVariable Long placeUserId) {
        try {
            service.removeUser(placeUserId);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
