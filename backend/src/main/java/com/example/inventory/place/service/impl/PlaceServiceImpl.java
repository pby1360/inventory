package com.example.inventory.place.service.impl;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.common.DuplicateException;
import com.example.inventory.common.enums.UserPlaceStatus;
import com.example.inventory.common.enums.UserPermission;
import com.example.inventory.place.dto.PlaceDTO;
import com.example.inventory.place.dto.PlaceModifyDTO;
import com.example.inventory.place.dto.PlaceUserDTO;
import com.example.inventory.place.entity.Place;
import com.example.inventory.place.entity.PlaceUser;
import com.example.inventory.place.repository.PlaceRepository;
import com.example.inventory.place.repository.PlaceUserRepository;
import com.example.inventory.place.service.PlaceSerivce;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PlaceServiceImpl implements PlaceSerivce {

    private PlaceRepository repository;
    private PlaceUserRepository placeUserRepository;
    private AuthRepository authRepository;

    public PlaceServiceImpl(PlaceRepository repository, PlaceUserRepository placeUserRepository, AuthRepository authRepository) {
        this.repository = repository;
        this.placeUserRepository = placeUserRepository;
        this.authRepository = authRepository;
    }

    @Override
    public List<PlaceUserDTO> getPlacesByUser(String userId) {
        return placeUserRepository.findByUserId(userId).stream()
                .map(placeUser -> new PlaceUserDTO(
                        placeUser.getId()
                        , placeUser.getUser().getId()
                        , placeUser.getUser().getName()
                        , placeUser.getUser().getPhoneNumber()
                        , placeUser.getPlace().getId()
                        , placeUser.getStatus().getName()
                        , placeUser.getPermission().getName()
                        , placeUser.getCreatedAt()
                        , PlaceDTO.builder()
                            .id(placeUser.getPlace().getId())
                            .name(placeUser.getPlace().getName())
                            .category(placeUser.getPlace().getCategory())
                            .zipCode(placeUser.getPlace().getZipCode())
                            .address1(placeUser.getPlace().getAddress1())
                            .address2(placeUser.getPlace().getAddress2())
                            .contact(placeUser.getPlace().getContact())
                            .remark(placeUser.getPlace().getRemark())
                            .placeUsers(placeUser.getPlace().getPlaceUsers().stream().map(user -> new PlaceUserDTO(user.getId(), user.getUser().getId(), user.getUser().getName(), user.getUser().getPhoneNumber(), user.getPlace().getId(), user.getStatus().getName(), user.getPermission().getName(), user.getCreatedAt(), null)).collect(Collectors.toList()))
                        .build()))
                .collect(Collectors.toList());
    }

    @Override
    public PlaceDTO getPlaceDetail(Long id) {
        Place place = repository.findById(id).orElseThrow();
        return PlaceDTO.builder()
                .id(place.getId())
                .name(place.getName())
                .category(place.getCategory())
                .zipCode(place.getZipCode())
                .address1(place.getAddress1())
                .address2(place.getAddress2())
                .contact(place.getContact())
                .remark(place.getRemark())
                .placeUsers(place.getPlaceUsers().stream().map(placeUser -> new PlaceUserDTO(placeUser.getId(), placeUser.getUser().getId(), placeUser.getUser().getName(), placeUser.getUser().getPhoneNumber(), placeUser.getPlace().getId(), placeUser.getStatus().getName(), placeUser.getPermission().getName(), placeUser.getCreatedAt(), null)).collect(Collectors.toList()))
                .build();
    }

    @Override
    public void createPlace(Place place) {
        Place newPlace = repository.save(place);

        Auth auth = authRepository.findById(newPlace.getCreatedBy()).orElseThrow();

        PlaceUser user = new PlaceUser(auth, newPlace, UserPlaceStatus.IN_USE, UserPermission.ADMIN);
        //        PlaceUser user = new PlaceUser(newPlace.getCreatedBy(), newPlace, UserPlaceStatus.IN_USE, UserPermission.ADMIN);
        placeUserRepository.save(user);
    }

    @Override
    public void modifyPlace(PlaceModifyDTO placeModifyDto) throws IllegalAccessException {
        if (isModifiable(placeModifyDto.getUserId(), placeModifyDto.getId())) {
            Place place = repository.findById(placeModifyDto.getId()).orElseThrow();
            place.modify(placeModifyDto);
            repository.save(place);
        } else {
            throw new IllegalAccessException("no permission");
        }
    }

    @Override
    public void deletePlace(Long placeId) {

    }

    @Override
    public List<PlaceUserDTO> getPlaceUsers(Long id) {
        List<PlaceUser> users = placeUserRepository.findByPlaceId(id);
        return
                users.stream()
                        .map(user -> new PlaceUserDTO(
                                user.getId()
                                , user.getUser().getId()
                                , user.getUser().getName()
                                , user.getUser().getPhoneNumber() == null ? "-" : user.getUser().getPhoneNumber()
                                , user.getPlace().getId()
                                , user.getStatus().getName()
                                , user.getPermission().getName()
                                , user.getCreatedAt()
                                , null
                                )
                        )
                        .collect(Collectors.toList());
    }

    @Override
    public void addUSer(PlaceUserDTO userDto) throws DuplicateException {
        if(!ObjectUtils.isEmpty(placeUserRepository.findByUserIdAndPlaceId(userDto.getUserId(), userDto.getPlaceId()))) {
            throw new DuplicateException("이미 등록된 사용자. 사업장 id : " + userDto.getPlaceId() + ", 사용자 id : " + userDto.getUserId());
        }
        Auth user = authRepository.findById(userDto.getUserId()).orElseThrow();
        Place place = repository.findById(userDto.getPlaceId()).orElseThrow();
        PlaceUser placeUser = new PlaceUser(user, place, UserPlaceStatus.INVITED, UserPermission.of(userDto.getPermission()));
        placeUserRepository.save(placeUser);
    }

    @Override
    public void modifyPlaceUser(PlaceUserDTO userDto) {
        PlaceUser user = placeUserRepository.findById(userDto.getId()).orElseThrow();
        user.modifyUser(userDto.getPermission(), userDto.getStatus());
        placeUserRepository.save(user);
    }

    @Override
    public void removeUser(Long placeUserId) {
        placeUserRepository.deleteById(placeUserId);
    }

    @Override
    public void updateUserStatus(Long placeUserId, String status) {
        PlaceUser placeUser = placeUserRepository.findById(placeUserId).orElseThrow();
        placeUser.updateStatus(status);
        placeUserRepository.save(placeUser);
    }

    private boolean isModifiable (String userId, Long placeId) {
        PlaceUser placeUser = placeUserRepository.findByUserIdAndPlaceId(userId, placeId);

        if (placeUser.getPermission() == UserPermission.ADMIN) {
            return true;
        } else {
            return false;
        }
    }
}
