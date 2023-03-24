package com.example.inventory.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoResponse {
    private long id;
    private KakaoAccount kakao_account;
}
