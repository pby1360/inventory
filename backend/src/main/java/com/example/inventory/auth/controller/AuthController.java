package com.example.inventory.auth.controller;

import com.example.inventory.auth.dto.KakaoAuth;
import com.example.inventory.auth.dto.SignInRequest;
import com.example.inventory.auth.dto.SignInResponse;
import com.example.inventory.auth.dto.SignUpRequest;
import com.example.inventory.auth.service.impl.AuthServiceImpl;
import com.example.inventory.auth.service.AuthService;
import com.example.inventory.auth.service.impl.KakaoAuthServiceImpl;
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
    private AuthService kakaoAuthService;

    public AuthController(AuthServiceImpl authService, KakaoAuthServiceImpl kakaoAuthService) {
        this.authService = authService;
        this.kakaoAuthService = kakaoAuthService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest siginIn) {
        log.info(":: signIn id {}", siginIn.getId());
        log.info(":: signIn password {}", siginIn.getPassword());

        try {
            SignInResponse response = authService.signIn(siginIn);
             return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("jointype");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("password");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/sign-in/kakao")
    public ResponseEntity<SignInResponse> signInKakao(@RequestBody KakaoAuth kakaoAuth) {
        log.info(":: signIn token {}", kakaoAuth.getToken());
        try {

            SignInResponse response = kakaoAuthService.signIn(kakaoAuth);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (IllegalArgumentException e) {
            log.info(":: already sign-up with other route");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        if (authService.existById(signUpRequest.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        authService.create(signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
