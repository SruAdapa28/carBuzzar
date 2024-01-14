package com.carbazzar.dealerservice.services.Impl;

import com.carbazzar.dealerservice.adapter.DtoAdapter;
import com.carbazzar.dealerservice.dto.DealerFacilitiesDto;
import com.carbazzar.dealerservice.entity.Car;
import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.entity.NewCar;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.repository.DealerRepository;
import com.carbazzar.dealerservice.repository.NewCarRepository;
import com.carbazzar.dealerservice.restclient.CarService;
import com.carbazzar.dealerservice.services.NewCarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NewCarServiceImpl implements NewCarService {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    NewCarRepository newCarRepository;

    @Autowired
    CarService carService;

    @Override
    public NewCar getNewCarById(int id) {
        return null;
    }

    @Override
    public List<NewCar> saveNewCars(List<NewCar> newCarList,long dealerId) {
        Optional<Dealer> byId = dealerRepository.findById(dealerId);
        Dealer dealer = byId.get();

        newCarList.forEach(
                newCar -> {
                    newCar.setDealer(dealer);
                    newCarRepository.save(newCar);
                }
        );
        return newCarList;
    }

    @Override
    public List<NewCar> findAllNewCars() {
        return newCarRepository.findAll();
    }

    @Override
    public List<NewCar> findAllNewCarsInCity(String city) {
        List<NewCar> newCars = newCarRepository.findNewCarByCity(city);
        return newCars;
    }

    @Override
    public NewCar findNewCarById(long id) {
        return newCarRepository.findById(id).get();
    }

    @Override
    public List<DealerFacilitiesDto> getDealerComparisionResult(String carName, String variantName, String city) {
        List<NewCar> newCars = newCarRepository.fetchDealerFacilities(carName, variantName, city);
        List<DealerFacilitiesDto> dealerFacilitiesDto = newCars.stream().map(DtoAdapter::convertNewCarIntoDealerFacilitiesDto).collect(Collectors.toList());
        return dealerFacilitiesDto;
    }

    @Override
    public ResponseDto<List<Car>> getNewCarsInCity(String city) {
        List<Dealer> dealers = dealerRepository.findByCity(city);
        Set<String> brandNameSet = new HashSet<>();
        for (Dealer dealer : dealers) {
            brandNameSet.add(dealer.getBrand().getName());
        }
        List<String> brandNames = brandNameSet.stream().collect(Collectors.toList());

        return carService.fetchNewCarsInCity(brandNames);
    }

    @Override
    public ResponseDto<List<Car>> findAllLatestCars(String city) {
        List<Dealer> dealers = dealerRepository.findByCity(city);
        Set<String> brandNameSet = new HashSet<>();
        for (Dealer dealer : dealers) {
            brandNameSet.add(dealer.getBrand().getName());
        }
        List<String> brandNames = brandNameSet.stream().collect(Collectors.toList());

        return carService.fetchLatestCarsInCity(brandNames);
    }

    @Override
    public String deleteNewCarById(long id) {
        newCarRepository.deleteById(id);
        return "Success";
    }


}
