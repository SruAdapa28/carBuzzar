package com.carbazzar.dealerservice.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InsuranceRequestDto {
    private String name;
    private String description;
    private BigDecimal price;
    private String duration;
}
