package com.carbazzar.dealerservice.repository;

import com.carbazzar.dealerservice.entity.NewCar;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewCarSearchRepository {
    List<NewCar> findNewCarByCity(String city);
    List<NewCar> fetchDealerFacilities(String carName,String variantName,String city);
}
