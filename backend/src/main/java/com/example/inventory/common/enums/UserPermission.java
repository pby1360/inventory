package com.example.inventory.common.enums;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UserPermission {

    ADMIN("admin"),
    MANAGER("manager"),
    USER("user"),
    GUEST("guest");

    private String name;

    private static final Map<String, String> map = Collections.unmodifiableMap(
            Stream.of(values()).collect(Collectors.toMap(UserPermission::getName, UserPermission::name)));


    UserPermission(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public static UserPermission of (final String name) {
        return UserPermission.valueOf(map.get(name));
    }
}
