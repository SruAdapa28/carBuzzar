package com.carbazzar.dealerservice.services;

import com.carbazzar.dealerservice.entity.OldCar;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OldCarService {
    OldCar getOldCarById(Long id);
    List<OldCar> saveOldCars(List<OldCar> oldCarList,long dealerId);
    List<OldCar> getAllOldCars();
    List<OldCar> getAllOldCarsInCity(String city);

    List<OldCar> compareOldCars(List<Long> oldCarIds);

    List<String> updateImages(Long id, List<String> filePathList);
}
