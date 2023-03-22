package com.example.inventory.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class SignInResponse {
    private String id;
    private String name;
    private Set<String> roles;
    private String token;
    private long expiredAt;

    // TODO: 2023-03-22 add User Information field 
    // private User user;
}
