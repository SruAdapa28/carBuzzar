package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.dto.DealerComparisionResultDto;
import com.carbazzar.dealerservice.dto.DealerFacilitiesDto;
import com.carbazzar.dealerservice.entity.Car;
import com.carbazzar.dealerservice.entity.NewCar;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.services.NewCarService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/newcar")
@RestController
@CrossOrigin
public class NewCarController {

    @Autowired
    NewCarService newCarService;

    @PostMapping("/{id}")
    @ApiOperation("Save NewcarRecord(s) into DB")
    public ResponseDto<List<NewCar>> addNewCars(@RequestBody List<NewCar> newCarList, @PathVariable long id)
    {
        List<NewCar> newCars = newCarService.saveNewCars(newCarList, id);
        return ResponseDto.success("NewCars List Mapped Successfully",newCars);
    }

    @GetMapping("/")
    @ApiOperation("Find All NewCar(s)")
    public ResponseDto<List<NewCar>> findAllNewCars()
    {
        List<NewCar> newCars = newCarService.findAllNewCars();
        System.out.println("New Cars...");
        newCars.stream().forEach(car->{
            System.out.println(car.getCarName());
        });

        return ResponseDto.success("NewCars List Fetched Successfully",newCars);
    }

    @GetMapping("/{id}")
    @ApiOperation("Find NewCar by Id")
    public ResponseDto<NewCar> findNewCarById(@PathVariable long id)
    {
        NewCar car = newCarService.findNewCarById(id);
        return ResponseDto.success("Car record fetched ",car);
    }

    /*@GetMapping("/city/{cityName}")
    @ApiOperation("Find All NewCar(s) in your city")
    public ResponseDto<List<NewCar>> findAllNewCarsInCity(@PathVariable String cityName)
    {
        return ResponseDto.success("Car List Fetched Successfully",newCarService.findAllNewCarsInCity(cityName.trim()));
    }*/


    @GetMapping("/compare/dealer")
    @ApiOperation("Compare Dealers")
    public ResponseDto<List<DealerFacilitiesDto>> findDealerComparisonResult(@RequestParam String carName, @RequestParam String variantName, @RequestParam String city)
    {
        return ResponseDto.success("Dealer Comparison Result Fetched",newCarService.getDealerComparisionResult(carName,variantName,city));
    }

    @GetMapping("/city")
    @ApiOperation("Get new cars in city")
    public ResponseDto<List<Car>> fetchNewCarInCity(@RequestParam("city") String city)
    {
        return newCarService.getNewCarsInCity(city);
    }

    @GetMapping("/latest/city")
    @ApiOperation("Get Latest cars in city")
    public ResponseDto<List<Car>> fetchLatestCarInCity(@RequestParam("city") String city)
    {
        return newCarService.findAllLatestCars(city);
    }

    @DeleteMapping("/delete")
    @ApiOperation("Delete NewCar by ID")
    public ResponseDto<String> deleteNewCarBYId(@RequestParam("id") long id)
    {
        return ResponseDto.success(newCarService.deleteNewCarById(id));
    }
   /* @GetMapping("/similarcar")
    @ApiOperation("Show similar cars")
    public ResponseDto<List<Car>> showSimilarCars(@RequestParam("carName") String carName,@RequestParam("city") String city){
        return null;
    }*/
}
