package com.carbazzar.dealerservice.dto;


import com.carbazzar.dealerservice.entity.Brand;
import com.carbazzar.dealerservice.enums.BodyType;
import com.carbazzar.dealerservice.enums.FuelType;
import com.carbazzar.dealerservice.enums.TransmissionType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchResultsDto {

    private Long id;
    private String variantName;
    private BigDecimal exShowroomPrice;
    private FuelType fuelType;
    private BodyType bodyType;
    private Double safetyRating;
    private TransmissionType transmissionType;
    private Double mileage;
    private Integer airbags;
    private Integer engine;
    private Long carId;
    private String carName;
    private Brand carBrand;
    private List<String> imageUrlList;
    private Integer manufacturingYear;
    private Integer seatCapacity;
}
