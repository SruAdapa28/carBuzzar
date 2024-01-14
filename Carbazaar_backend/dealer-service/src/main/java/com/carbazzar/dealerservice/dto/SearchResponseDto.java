package com.carbazzar.dealerservice.dto;

import com.carbazzar.dealerservice.entity.NewCar;
import com.carbazzar.dealerservice.entity.OldCar;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchResponseDto {
    private List<OldCarResponseDto> oldCars;
    private List<SearchResultsDto> newCars;
}
