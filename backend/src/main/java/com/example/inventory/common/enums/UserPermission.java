package com.example.inventory.common.enums;

public enum UserPermission {

    ADMIN("admin"),
    MANAGER("manager"),
    USER("user"),
    GUEST("guest");

    private String name;


    UserPermission(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
