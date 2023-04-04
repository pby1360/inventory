package com.example.inventory.auth.service;

import com.example.inventory.auth.dto.SignInRequest;
import com.example.inventory.auth.dto.SignInResponse;
import com.example.inventory.auth.dto.SignUpRequest;

public interface AuthService<T> {
    boolean existById (String id);

    void create (SignUpRequest request);
    SignInResponse signIn (T signIn) throws Exception;
}
