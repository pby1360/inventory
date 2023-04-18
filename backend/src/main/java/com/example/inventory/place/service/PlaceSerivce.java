package com.example.inventory.place.service;

import com.example.inventory.common.DuplicateException;
import com.example.inventory.place.dto.PlaceDTO;
import com.example.inventory.place.dto.PlaceModifyDTO;
import com.example.inventory.place.dto.PlaceUserDTO;
import com.example.inventory.place.entity.Place;

import java.util.List;

public interface PlaceSerivce {

    PlaceDTO getPlaceDetail(Long id);
    List<PlaceUserDTO> getPlacesByUser(String userId);
    void createPlace(Place place);
    void modifyPlace(PlaceModifyDTO place) throws Exception;
    void deletePlace(Long pliaceId);
    List<PlaceUserDTO> getPlaceUsers(Long id);

    void addUSer(PlaceUserDTO userDto) throws DuplicateException;
    void modifyPlaceUser(PlaceUserDTO userDto);
    void removeUser(Long placeUserId);
}
