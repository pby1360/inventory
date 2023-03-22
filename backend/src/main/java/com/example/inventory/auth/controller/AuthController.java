package com.example.inventory.auth.controller;

import com.example.inventory.auth.dto.SignUpRequestDTO;
import com.example.inventory.auth.service.impl.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private Logger log = LoggerFactory.getLogger(getClass());

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-in")
    public void signIn() {

    }
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequest) {
        log.info(":: signUp {}", signUpRequest.toString());
        if (authService.existById(signUpRequest.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        authService.create(signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
