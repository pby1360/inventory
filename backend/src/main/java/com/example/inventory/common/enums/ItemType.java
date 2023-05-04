package com.example.inventory.common.enums;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum ItemType {

    PROUDCT("product"),
    GOODS("goods"),
    MATERIAL("material"),
    ETC("etc");

    private String name;

    ItemType(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }

    private static final Map<String, String> map = Collections.unmodifiableMap(
            Stream.of(values()).collect(Collectors.toMap(ItemType::getName, ItemType::name)));

    public static ItemType of (final String name) {
        return ItemType.valueOf(map.get(name));
    }

}
