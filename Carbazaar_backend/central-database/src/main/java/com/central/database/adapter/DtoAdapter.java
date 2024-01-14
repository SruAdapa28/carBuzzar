package com.central.database.adapter;

import com.central.database.entity.NewCar;
import com.central.database.entity.OldCar;
import com.central.database.pojo.NewCarDto;
import com.central.database.pojo.OldCarDto;
import com.central.database.util.ObjectUtils;
import lombok.experimental.UtilityClass;

import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class DtoAdapter {

    public List<OldCarDto> convertEntityToDto(List<OldCar> oldCarList) {
        List<OldCarDto> oldCarDtoList = new ArrayList<>();
        oldCarList.forEach(oldCarDto -> {
            oldCarDtoList.add(ObjectUtils.createObjectByCopying(oldCarDto, new OldCarDto()));
        });

        return oldCarDtoList;
    }

    public List<OldCar> convertDtoToEntity(List<OldCarDto> oldCarDtoList) {
        List<OldCar> oldCarList = new ArrayList<>();
        oldCarDtoList.forEach(oldCarDto -> oldCarList.add(ObjectUtils.createObjectByCopying(oldCarDto, new OldCar())));

        return oldCarList;
    }

    public List<NewCarDto> convertNewCarEntityToDto(List<NewCar> newCarList) {
        List<NewCarDto> newCarDtoList = new ArrayList<>();
        newCarList.forEach(oldCarDto -> {
            newCarDtoList.add(ObjectUtils.createObjectByCopying(oldCarDto, new NewCarDto()));
        });

        return newCarDtoList;
    }

    public List<NewCar> convertNewCarDtoToEntity(List<NewCarDto> newCarDtoList) {
        List<NewCar> newCarList = new ArrayList<>();
        newCarDtoList.forEach(oldCarDto -> newCarList.add(ObjectUtils.createObjectByCopying(oldCarDto, new NewCar())));

        return newCarList;
    }

}
