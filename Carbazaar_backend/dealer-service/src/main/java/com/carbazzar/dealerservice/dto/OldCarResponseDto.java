package com.carbazzar.dealerservice.dto;

import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.enums.FuelType;
import com.carbazzar.dealerservice.enums.TransmissionType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OldCarResponseDto {

    private long id;
    private String carName;
    private String variantName;
    private FuelType fuelType;
    private int kilometersDriven;
    private String insuranceLastDate;
    private String insuranceDescription;
    private String ownerStatus;
    private String yearOfPurchase;
    private String registration;
    private List<String> imageUrlList;
    private TransmissionType transmissionType;
    private long dealerId;
    private BigDecimal dealerPrice;
}
