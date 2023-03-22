package com.example.inventory.auth.service.impl;

import com.example.inventory.auth.dto.SignUpRequestDTO;

public interface AuthService {
    boolean existById (String id);

    void create (SignUpRequestDTO signUpRequest);
}
