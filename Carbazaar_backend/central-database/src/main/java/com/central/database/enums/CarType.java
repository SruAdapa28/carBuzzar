package com.central.database.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CarType {
    OLD("Old"),
    NEW("New"),
    BOTH("Both");

    private String carType;
}
