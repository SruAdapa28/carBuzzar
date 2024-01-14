package com.carbazzar.dealerservice.dto;

import com.carbazzar.dealerservice.enums.BodyType;
import com.carbazzar.dealerservice.enums.FuelType;
import com.carbazzar.dealerservice.enums.TransmissionType;
import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SearchDto {
    private String carType;
    private int minPrice;
    private int maxPrice;
    //checkbox
    private List<Integer> seatCapacity;
    private List<TransmissionType> transmissionType;
    private double safetyRatings=0;
    private double mileage=0;
    //car model
    private String carName;
    //brand
    private String brandName;
    //checkbox
    private List<FuelType> fuelType;
    private int airBags=0;
    //checkbox
    private List<BodyType> bodyType;
    private String color;
    private String city;
    private List<String> ownerType;
    private int kilometersDriven;
    private List<String> brandNames;
}