package com.example.inventory.auth.service;

import com.example.inventory.auth.dto.SignUpRequestDTO;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.auth.service.impl.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository repository;
    private PasswordEncoder encoder;

    public AuthServiceImpl(AuthRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public boolean existById(String id) {
        return repository.existsById(id);
    }

    @Override
    public void create(SignUpRequestDTO signUpRequest) {
        signUpRequest.setPassword(encoder.encode(signUpRequest.getPassword()));
        repository.save(signUpRequest.toEntity());
    }
}
