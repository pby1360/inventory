package com.example.inventory.auth.dto;

import com.example.inventory.auth.entity.Auth;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SignUpRequestDTO {
    private String id;
    private String password;
    private String name;
    private LocalDate birth;
    private String gender;

    public Auth toEntity() {
        return Auth
                .builder()
                .id(id)
                .password(password)
                .name(name)
                .birth(birth)
                .gender(gender)
                .isNew(true)
                .build();
    }
}
