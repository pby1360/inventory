package com.example.inventory.auth.service.impl;

import com.example.inventory.auth.dto.*;
import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import com.example.inventory.common.enums.JoinType;
import com.example.inventory.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;

@Service
public class KakaoAuthServiceImpl implements AuthService<KakaoAuth> {

    private Logger log = LoggerFactory.getLogger(getClass());
    private final AuthRepository repository;
    private JwtTokenProvider tokenProvider;

    public KakaoAuthServiceImpl(AuthRepository repository, JwtTokenProvider tokenProvider) {
        this.repository = repository;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public boolean existById(String id) {
        return repository.existsById(id);
    }

    @Override
    public void create(SignUpRequest signUpRequest) {
        Auth newUser  = Auth.builder()
                .id(signUpRequest.getId())
                .name(signUpRequest.getName())
                .gender(signUpRequest.getGender())
                .type(JoinType.KAKAO)
                .isNew(true)
                .build();
        repository.save(newUser);
    }

    @Override
    public SignInResponse signIn(KakaoAuth kakaoAuth) throws IllegalAccessException {
        KakaoAccount kakaoAccount = getKakaoUserInfo(kakaoAuth.getToken());

        if (!existById(kakaoAccount.getEmail())) {
            SignUpRequest request = SignUpRequest.builder()
                    .id(kakaoAccount.getEmail())
                    .name(kakaoAccount.getProfile().getNickname())
                    .gender(kakaoAccount.getGender())
                    .build();
            create(request);
        }

        Auth auth = repository.findById(kakaoAccount.getEmail()).orElseThrow();

        if (!auth.getType().equals(JoinType.KAKAO)) {
            throw new IllegalArgumentException();
        }

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

    public KakaoAccount getKakaoUserInfo(String token) {
        UriComponentsBuilder builder =  UriComponentsBuilder.fromPath("/v2/user/me")
                .scheme("https")
                .host("kapi.kakao.com");

        URI uri = builder.build(false).encode().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "bearer " + token);
//        headers.set("KakaoAK", "afe53dc29e67d315806415a8096c03b6");

        HttpEntity<Map<String, Object>> restRequest = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<KakaoResponse> response = restTemplate.postForEntity(uri, restRequest, KakaoResponse.class);

        return response.getBody().getKakao_account();
    }
}
