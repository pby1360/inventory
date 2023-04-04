package com.example.inventory.common.enums;

public enum UserPlaceStatus {
    INVITED("invited"),
    IN_USE("inUse"),
    DISABLED("disabled");

    private String name;

    UserPlaceStatus(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }
}
