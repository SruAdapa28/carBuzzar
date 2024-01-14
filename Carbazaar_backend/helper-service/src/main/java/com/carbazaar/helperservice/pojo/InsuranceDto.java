package com.carbazaar.helperservice.pojo;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String duration;
}
