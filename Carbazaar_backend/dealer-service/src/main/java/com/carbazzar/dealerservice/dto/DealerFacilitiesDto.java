package com.carbazzar.dealerservice.dto;

import com.carbazzar.dealerservice.entity.Offers;
import lombok.*;

import javax.persistence.Column;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DealerFacilitiesDto {

    private String dealerName;
    private long dealerId;
    private List<Offers> offer;
    private List<String> colors;
    private int watingPeriod;
    private String offerDetails;
    private String offerValidUpto;
    private boolean buybackGurantee;
    private String buybackGuranteeDetails;
    private boolean freeAccessories;
    private String freeAccessoriesDetails;
    private boolean discountAvailable;
    private double discountPercentage;

}
