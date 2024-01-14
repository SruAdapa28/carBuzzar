package com.carbazzar.dealerservice.services;

import com.carbazzar.dealerservice.dto.DealerFacilitiesDto;
import com.carbazzar.dealerservice.entity.Car;
import com.carbazzar.dealerservice.entity.NewCar;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NewCarService {
    NewCar getNewCarById(int id);
    List<NewCar> saveNewCars(List<NewCar> newCarList,long dealerId);
    List<NewCar> findAllNewCars();
    List<NewCar> findAllNewCarsInCity(String city);
    NewCar findNewCarById(long id);
    List<DealerFacilitiesDto> getDealerComparisionResult(String carName, String variantName, String city);
    ResponseDto<List<Car>> getNewCarsInCity(String city);
    ResponseDto<List<Car>> findAllLatestCars(String city);
    String deleteNewCarById(long id);
}
