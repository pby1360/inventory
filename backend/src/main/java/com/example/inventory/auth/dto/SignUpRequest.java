package com.example.inventory.auth.dto;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.common.enums.JoinType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class SignUpRequest {
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
                .type(JoinType.INVENTORY)
                .isNew(true)
                .build();
    }
}
