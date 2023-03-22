package com.example.inventory.auth.controller;

import com.example.inventory.auth.dto.SignInRequest;
import com.example.inventory.auth.dto.SignInResponse;
import com.example.inventory.auth.dto.SignUpRequest;
import com.example.inventory.auth.service.impl.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private Logger log = LoggerFactory.getLogger(getClass());

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest siginIn) {
        log.info(":: signIn id {}", siginIn.getId());
        log.info(":: signIn password {}", siginIn.getPassword());

        try {
            SignInResponse response = authService.signIn(siginIn);
             return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        log.info(":: signUp {}", signUpRequest.toString());
        if (authService.existById(signUpRequest.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        authService.create(signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
