package com.carbazzar.dealerservice.adapter;

import com.carbazzar.dealerservice.dto.DealerFacilitiesDto;
import com.carbazzar.dealerservice.dto.InsuranceRequestDto;
import com.carbazzar.dealerservice.dto.OldCarResponseDto;
import com.carbazzar.dealerservice.entity.*;
import com.carbazzar.dealerservice.pojo.DealerRequestDto;
import com.carbazzar.dealerservice.util.ObjectUtils;
import lombok.experimental.UtilityClass;

import java.util.ArrayList;

@UtilityClass
public class DtoAdapter {

//    public CarDto convertCarEntityToDto(Car car) {
//        CarDto carDto = ObjectUtils.createObjectByCopying(car, new CarDto());
//        carDto.setBrand(ObjectUtils.createObjectByCopying(car.getBrand(), new BrandDto()));
//        return carDto;
//    }
//
//    public CarListingDto convertCarEntityToListingDto(Car car) {
//        CarListingDto carListingDto = ObjectUtils.createObjectByCopying(car, new CarListingDto());
//        carListingDto.setBrandName(car.getBrand().getName());
//        return carListingDto;
//    }
//
//    public Car convertCarDtoToEntity(CarDto carDto, Brand brand) {
//        Car car = ObjectUtils.createObjectByCopying(carDto, new Car());
//        car.setId(null); //Automatically create new id for a new record
//        car.setBrand(brand);
//        return car;
//    }
//
//    public BrandDto convertBrandEntityToDto(Brand brand) {
//        return ObjectUtils.createObjectByCopying(brand, new BrandDto());
//    }
//
//    public SearchResultsDto convertVariantEntityToDto(Variant variant){
//        return ObjectUtils.createObjectByCopying(variant,new SearchResultsDto());
//    }

      public Dealer convertDealerDtoToEntity(DealerRequestDto dealerRequestDto, Brand brand) {
          Dealer dealer = ObjectUtils.createObjectByCopying(dealerRequestDto,new Dealer());
          dealer.setId(null);
          dealer.setBrand(brand);
          dealer.setNewCars(new ArrayList<NewCar>());
          dealer.setOldCars(new ArrayList<OldCar>());
          dealer.setOffers(new ArrayList<Offers>());
          return dealer;
      }

      public Insurance convertInsuranceDtoToEntity(InsuranceRequestDto insuranceRequestDto){
          Insurance insurance = ObjectUtils.createObjectByCopying(insuranceRequestDto,new Insurance());
          insurance.setDealer(new ArrayList<>());
          return insurance;
      }

      public OldCarResponseDto convertOldCarIntoOldCarResponseDto(OldCar oldCar)
      {
          OldCarResponseDto oldCarResponseDto = ObjectUtils.createObjectByCopying(oldCar, new OldCarResponseDto());
          return oldCarResponseDto;
      }

      public DealerFacilitiesDto convertNewCarIntoDealerFacilitiesDto(NewCar newCar)
      {
          DealerFacilitiesDto dealerFacilitiesDto = ObjectUtils.createObjectByCopying(newCar, new DealerFacilitiesDto());
          return dealerFacilitiesDto;
      }
}
