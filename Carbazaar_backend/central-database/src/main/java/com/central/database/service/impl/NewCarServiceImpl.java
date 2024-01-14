package com.central.database.service.impl;

import com.central.database.adapter.DtoAdapter;
import com.central.database.entity.NewCar;
import com.central.database.exception.AssetNotFoundException;
import com.central.database.pojo.NewCarDto;
import com.central.database.repository.NewCarRepository;
import com.central.database.service.NewCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class NewCarServiceImpl implements NewCarService {

    private final NewCarRepository newCarRepository;

    @Override
    public List<NewCarDto> saveNewCars(List<NewCarDto> newCarDtoList) {
        List<NewCarDto> response;
        response = DtoAdapter.convertNewCarEntityToDto(newCarRepository.saveAll(DtoAdapter.convertNewCarDtoToEntity(newCarDtoList)));
        return response;
    }

    @Override
    public NewCarDto fetchNewCarById(Long id) {
        Optional<NewCar> newCarOptional = newCarRepository.findById(id);
        if(newCarOptional.isPresent()) {
            return DtoAdapter.convertNewCarEntityToDto(Collections.singletonList(newCarOptional.get())).get(0);
        }
        throw new AssetNotFoundException("No used car found for id : " + id);
    }

    @Override
    public NewCarDto updateNewCar(NewCarDto newCarDto, Long id) {
        Optional<NewCar> newCarOptional = newCarRepository.findById(id);
        if(newCarOptional.isPresent()) {
            NewCar newCar = newCarOptional.get();
            newCar = DtoAdapter.convertNewCarDtoToEntity(Collections.singletonList(newCarDto)).get(0);
            newCarRepository.save(newCar);
            return DtoAdapter.convertNewCarEntityToDto(Collections.singletonList(newCar)).get(0);
        }

        throw new AssetNotFoundException("No used car found for id : " + id);
    }

    @Override
    public List<NewCarDto> fetchAllCars() {
        return DtoAdapter.convertNewCarEntityToDto(newCarRepository.findAll());
    }
}
