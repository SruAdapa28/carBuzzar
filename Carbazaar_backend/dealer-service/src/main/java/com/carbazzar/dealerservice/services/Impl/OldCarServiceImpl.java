package com.carbazzar.dealerservice.services.Impl;

import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.entity.OldCar;
import com.carbazzar.dealerservice.exception.ApiValidationException;
import com.carbazzar.dealerservice.exception.AssetNotFoundException;
import com.carbazzar.dealerservice.repository.DealerRepository;
import com.carbazzar.dealerservice.repository.OldCarRepository;
import com.carbazzar.dealerservice.services.OldCarService;
import com.carbazzar.dealerservice.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OldCarServiceImpl implements OldCarService {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    OldCarRepository oldCarRepository;

    @Autowired
    StorageService storageService;

    @Override
    public OldCar getOldCarById(Long id) {

        Optional<OldCar> oldCarOptional = oldCarRepository.findById(id);

        if(oldCarOptional.isPresent()) {
            OldCar oldCar = oldCarOptional.get();
            oldCar.setImageUrlList(storageService.getFileData(oldCar.getImageUrlList()));
            return oldCar;
        }
        throw new AssetNotFoundException("No old car found for id " + id);
    }

    @Override
    public List<OldCar> saveOldCars(List<OldCar> oldCarList, long dealerId) {
        Optional<Dealer> byId = dealerRepository.findById(dealerId);
        Dealer dealer = byId.get();

        oldCarList.forEach(
                oldCar -> {
                    oldCar.setDealer(dealer);
                    oldCarRepository.save(oldCar);
                }
        );
        return oldCarList;
    }

    @Override
    public List<OldCar> getAllOldCars() {
        List<OldCar> oldCarList = oldCarRepository.findAll();
        oldCarList.forEach(oldCar -> oldCar.setImageUrlList(storageService.getFileData(oldCar.getImageUrlList())));
        return oldCarList;
    }

    @Override
    public List<OldCar> getAllOldCarsInCity(String city) {
        List<OldCar> oldCarList = oldCarRepository.findOldCarsByCity(city);
        oldCarList.forEach(oldCar -> oldCar.setImageUrlList(storageService.getFileData(oldCar.getImageUrlList())));
        return oldCarList;
    }

    @Override
    public List<OldCar> compareOldCars(List<Long> oldCarIds) {
        List<OldCar> resultSet = new ArrayList<>();
        oldCarIds.forEach(
                oldCarId -> {
                    OldCar oldCar = oldCarRepository.findById(oldCarId).get();
                    oldCar.setImageUrlList(storageService.getFileData(oldCar.getImageUrlList()));
                    resultSet.add(oldCar);
                }
        );

        return resultSet;
    }

    @Override
    public List<String> updateImages(Long id, List<String> filePathList) {
        Optional<OldCar> oldCarOptional = oldCarRepository.findById(id);
        if(oldCarOptional.isPresent()) {
            OldCar oldCar = oldCarOptional.get();
            oldCar.setImageUrlList(filePathList);
            oldCarRepository.save(oldCar);
            return filePathList;
        }
        throw new ApiValidationException("No Old car found for id " + id);
    }

}
