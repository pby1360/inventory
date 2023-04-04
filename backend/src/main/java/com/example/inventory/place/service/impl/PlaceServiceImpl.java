package com.example.inventory.place.service.impl;

import com.example.inventory.common.enums.UserPlaceStatus;
import com.example.inventory.common.enums.UserPermission;
import com.example.inventory.place.entity.Place;
import com.example.inventory.place.entity.PlaceUser;
import com.example.inventory.place.model.PlaceModel;
import com.example.inventory.place.model.PlaceUserModel;
import com.example.inventory.place.repository.PlaceRepository;
import com.example.inventory.place.repository.PlaceUserRepository;
import com.example.inventory.place.service.PlaceSerivce;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PlaceServiceImpl implements PlaceSerivce {

    private PlaceRepository repository;
    private PlaceUserRepository placeUserRepository;

    public PlaceServiceImpl(PlaceRepository repository, PlaceUserRepository placeUserRepository) {
        this.repository = repository;
        this.placeUserRepository = placeUserRepository;
    }

    @Override
    public List<PlaceUserModel> getPlacesByUser(String userId) {
        return placeUserRepository.findByUserId(userId).stream()
                .map(placeUser -> new PlaceUserModel(
                        placeUser.getId()
                        , placeUser.getUserId()
                        , placeUser.getPlace().getId()
                        , placeUser.getStatus().getName()
                        , placeUser.getPermission().getName()
                        , PlaceModel.builder()
                            .id(placeUser.getPlace().getId())
                            .name(placeUser.getPlace().getName())
                            .category(placeUser.getPlace().getCategory())
                            .zipCode(placeUser.getPlace().getZipCode())
                            .address1(placeUser.getPlace().getAddress1())
                            .address2(placeUser.getPlace().getAddress2())
                            .contact(placeUser.getPlace().getContact())
                            .remark(placeUser.getPlace().getRemark())
                            .placeUsers(placeUser.getPlace().getPlaceUsers().stream().map(user -> new PlaceUserModel(user.getId(), user.getUserId(), user.getPlace().getId(), user.getStatus().getName(), user.getPermission().getName(), null)).collect(Collectors.toList()))
                            .build()))
                .collect(Collectors.toList());
    }

    @Override
    public PlaceModel getPlaces(Long id) {
        Place place = repository.findById(id).orElseThrow();
        return PlaceModel.builder()
                .id(place.getId())
                .name(place.getName())
                .category(place.getCategory())
                .zipCode(place.getZipCode())
                .address1(place.getAddress1())
                .address2(place.getAddress2())
                .contact(place.getContact())
                .remark(place.getRemark())
                .placeUsers(place.getPlaceUsers().stream().map(placeUser -> new PlaceUserModel(placeUser.getId(), placeUser.getUserId(), placeUser.getPlace().getId(), placeUser.getStatus().getName(), placeUser.getPermission().getName(), null)).collect(Collectors.toList()))
                .build();
    }

    @Override
    public void createPlace(Place place) {
        Place newPlace = repository.save(place);
        PlaceUser user = new PlaceUser(newPlace.getCreatedBy(), newPlace, UserPlaceStatus.IN_USE, UserPermission.ADMIN);
        placeUserRepository.save(user);
    }

    @Override
    public void modifyPlace(Place place) {

    }

    @Override
    public void deletePlace(Long pliaceId) {

    }
}
