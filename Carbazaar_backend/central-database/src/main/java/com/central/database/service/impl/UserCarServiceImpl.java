package com.central.database.service.impl;

import com.central.database.adapter.DtoAdapter;
import com.central.database.entity.OldCar;
import com.central.database.exception.AssetNotFoundException;
import com.central.database.pojo.OldCarDto;
import com.central.database.repository.OldCarRepository;
import com.central.database.service.UsedCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserCarServiceImpl implements UsedCarService {

    private final OldCarRepository oldCarRepository;

    @Override
    public List<OldCarDto> saveOldCars(List<OldCarDto> oldCarDtoList) {
        List<OldCarDto> response;
        response = DtoAdapter.convertEntityToDto(oldCarRepository.saveAll(DtoAdapter.convertDtoToEntity(oldCarDtoList)));
        return response;
    }

    @Override
    public OldCarDto fetchOldCarById(Long id) {
        Optional<OldCar> oldCarOptional = oldCarRepository.findById(id);
        if(oldCarOptional.isPresent()) {
            return DtoAdapter.convertEntityToDto(Collections.singletonList(oldCarOptional.get())).get(0);
        }
        throw new AssetNotFoundException("No used car found for id : " + id);
    }

    @Override
    public OldCarDto updateUsedCar(OldCarDto oldCarDto, Long id) {
        Optional<OldCar> oldCarOptional = oldCarRepository.findById(id);
        if(oldCarOptional.isPresent()) {
            OldCar oldCar = oldCarOptional.get();
            oldCar = DtoAdapter.convertDtoToEntity(Collections.singletonList(oldCarDto)).get(0);
            oldCarRepository.save(oldCar);
            return DtoAdapter.convertEntityToDto(Collections.singletonList(oldCar)).get(0);
        }

        throw new AssetNotFoundException("No used car found for id : " + id);
    }

    @Override
    public List<OldCarDto> fetchAllCars() {
        return DtoAdapter.convertEntityToDto(oldCarRepository.findAll());
    }
}
