package com.example.inventory.common.enums;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UserPlaceStatus {
    INVITED("invited"),
    IN_USE("inUse"),
    DISABLED("disabled");

    private String name;

    private static final Map<String, String> map = Collections.unmodifiableMap(
            Stream.of(values()).collect(Collectors.toMap(UserPlaceStatus::getName, UserPlaceStatus::name)));

    UserPlaceStatus(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }

    public static UserPlaceStatus of (final String name) {
        return UserPlaceStatus.valueOf(map.get(name));
    }
}
