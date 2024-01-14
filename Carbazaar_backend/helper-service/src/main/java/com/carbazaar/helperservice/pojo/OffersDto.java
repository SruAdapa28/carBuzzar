package com.carbazaar.helperservice.pojo;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OffersDto {
    private Long id;
    private BigDecimal discountPercentage;
    private Date expiryDate;
    private String description;
}
