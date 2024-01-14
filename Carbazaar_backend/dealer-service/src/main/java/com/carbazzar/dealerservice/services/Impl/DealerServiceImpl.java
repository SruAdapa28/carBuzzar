package com.carbazzar.dealerservice.services.Impl;

import com.carbazzar.dealerservice.adapter.DtoAdapter;
import com.carbazzar.dealerservice.entity.Brand;
import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.entity.Insurance;
import com.carbazzar.dealerservice.entity.OldCar;
import com.carbazzar.dealerservice.pojo.DealerRequestDto;
import com.carbazzar.dealerservice.repository.BrandRepository;
import com.carbazzar.dealerservice.repository.DealerRepository;
import com.carbazzar.dealerservice.restclient.CarService;
import com.carbazzar.dealerservice.services.DealerService;
import com.carbazzar.dealerservice.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class DealerServiceImpl implements DealerService {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    BrandRepository brandRepository;

    @Autowired
    CarService carService;

    @Autowired
    StorageService storageService;

    @Override
    public Dealer getDealerById(long id) {
        Optional<Dealer> byId = dealerRepository.findById(id);
        System.out.println(byId);
        Dealer dealer = byId.get();
        dealer.getOldCars().forEach(oldCar -> oldCar.setImageUrlList(storageService.getFileData(oldCar.getImageUrlList())));
        dealer.getNewCars().stream().forEach(
                (car) -> {
                    long variantID = carService.fetchVariantID(car.getCarName(), car.getVariantName());
                    System.out.println("ID:: "+variantID);
                    car.setVariantId(variantID);
                }
        );

        return dealer;
    }

    @Override
    public List<Dealer> fetchAllDealers() {
        return dealerRepository.findAll();
    }

    @Override
    public void deleteDealerById(Long id) {
        dealerRepository.deleteById(id);
    }

    @Override
    public List<Dealer> saveDealers(List<DealerRequestDto> dealerList) {
        List<Dealer> dealerResponseList = new ArrayList<Dealer>();
        dealerList.forEach(
                dealer -> {
                    String name = dealer.getBrandName();
                    Brand brand = brandRepository.findByName(name);

                    Dealer dealer1 = DtoAdapter.convertDealerDtoToEntity(dealer,brand);
                    System.out.println("Dealer... "+dealer1.toString());
                    Dealer dealerResponse = dealerRepository.save(dealer1);
                    dealerResponseList.add(dealerResponse);
                }
        );
        return dealerResponseList;
    }

    @Override
    public List<Dealer> findDealersInCity(String city) {
        List<Dealer> dealerResponse = dealerRepository.findByCity(city);
        return dealerResponse;
    }
}
