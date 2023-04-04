package com.example.inventory.auth.service.impl;

import com.example.inventory.auth.dto.SignInRequest;
import com.example.inventory.auth.dto.SignInResponse;
import com.example.inventory.auth.dto.SignUpRequest;
import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.auth.service.AuthService;
import com.example.inventory.common.enums.JoinType;
import com.example.inventory.security.JwtTokenProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService<SignInRequest> {
    private final AuthRepository repository;
    private PasswordEncoder encoder;
    private JwtTokenProvider tokenProvider;

    public AuthServiceImpl(AuthRepository repository, PasswordEncoder encoder, JwtTokenProvider tokenProvider) {
        this.repository = repository;
        this.encoder = encoder;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public boolean existById(String id) {
        return repository.existsById(id);
    }

    @Override
    public void create(SignUpRequest signUpRequest) {
        signUpRequest.setPassword(encoder.encode(signUpRequest.getPassword()));
        repository.save(signUpRequest.toEntity());
    }

    @Override
    public SignInResponse signIn(SignInRequest signIn)  throws IllegalAccessException{
        Auth auth = repository.findById(signIn.getId()).orElseThrow();

        if (!auth.getType().equals(JoinType.INVENTORY)) {
            throw new IllegalAccessException("Wrong Sign-in route");
        }

        if (!matchPassword(signIn.getPassword(), auth.getPassword())) {
            throw new BadCredentialsException("The Passwords does not match");
        }
        // TODO: 2023-03-22 need to add Permission
        String token = tokenProvider.createToken(auth.getId(), Collections.emptyList());
        return SignInResponse
                .builder()
                .id(auth.getId())
                .name(auth.getName())
                .roles(null)
                .token(token)
                .expiredAt(tokenProvider.getExpiration(token).getTime())
                .build();
    }

    private boolean matchPassword(String password, String encodedPassword) {
        return encoder.matches(password, encodedPassword);
    }
}
