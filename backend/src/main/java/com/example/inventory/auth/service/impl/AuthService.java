package com.example.inventory.auth.service.impl;

import com.example.inventory.auth.dto.SignInRequest;
import com.example.inventory.auth.dto.SignInResponse;
import com.example.inventory.auth.dto.SignUpRequest;

public interface AuthService {
    boolean existById (String id);

    void create (SignUpRequest signUpRequest);
    SignInResponse signIn (SignInRequest signIn);
}
