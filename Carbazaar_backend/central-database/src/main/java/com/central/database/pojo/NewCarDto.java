package com.central.database.pojo;

import com.central.database.enums.TransmissionType;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewCarDto {
    private String carName;
    private String variantName;
    private BigDecimal exShowroomPrice;
    private int engine;
    private Double mileage;
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType;
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
