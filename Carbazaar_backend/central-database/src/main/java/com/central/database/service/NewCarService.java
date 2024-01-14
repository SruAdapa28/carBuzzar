package com.central.database.service;

import com.central.database.pojo.NewCarDto;
import com.central.database.pojo.OldCarDto;

import java.util.List;

public interface NewCarService {
    List<NewCarDto> saveNewCars(List<NewCarDto> newCarDtoList);

    NewCarDto fetchNewCarById(Long id);

    NewCarDto updateNewCar(NewCarDto newCarDto, Long id);

    List<NewCarDto> fetchAllCars();
}
