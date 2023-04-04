package com.example.inventory.place.service;

import com.example.inventory.place.entity.Place;
import com.example.inventory.place.entity.PlaceUser;
import com.example.inventory.place.model.PlaceModel;
import com.example.inventory.place.model.PlaceUserModel;

import java.util.List;

public interface PlaceSerivce {

    PlaceModel getPlaces(Long id);
    List<PlaceUserModel> getPlacesByUser(String userId);
    void createPlace(Place place);
    void modifyPlace(Place place);
    void deletePlace(Long pliaceId);

//    void addUSer();
//    void modifyUserPermission();
//    void removeUser();
}
