package com.central.database.service;

import com.central.database.pojo.OldCarDto;

import java.util.List;

public interface UsedCarService {
    List<OldCarDto> saveOldCars(List<OldCarDto> oldCarDtoList);

    OldCarDto fetchOldCarById(Long id);

    OldCarDto updateUsedCar(OldCarDto oldCarDto, Long id);

    List<OldCarDto> fetchAllCars();
}
