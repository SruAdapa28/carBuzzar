package com.carbazzar.dealerservice.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewCarRequestDto {
    private long dealerId;
    private String modelName;
    private String variant;
    private String offerDetails;
    private String offerValidUpto;
    private boolean buybackGurantee;
    private String buybackGuranteeDetails;
    private boolean discountAvailable;
    private double discountPercentage;
}
