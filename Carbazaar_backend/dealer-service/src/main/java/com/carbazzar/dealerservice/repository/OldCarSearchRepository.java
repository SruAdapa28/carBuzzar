package com.carbazzar.dealerservice.repository;

import com.carbazzar.dealerservice.dto.SearchDto;
import com.carbazzar.dealerservice.entity.OldCar;

import java.util.List;

public interface OldCarSearchRepository {

    List<OldCar> findOldCarsByCity(String city);

    List<OldCar> findSearchResults(SearchDto searchDto);
}
