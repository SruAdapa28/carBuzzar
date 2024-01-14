package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.entity.OldCar;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.services.OldCarService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oldcar")
@CrossOrigin
public class OldCarController {

    @Autowired
    OldCarService oldCarService;

    @PostMapping("/{id}")
    @ApiOperation("Save OldCarRecord(s) into DB")
    public ResponseDto<List<OldCar>> addOldCarsList(@RequestBody List<OldCar> oldCarList,@PathVariable("id") long id)
    {
        List<OldCar> oldCars = oldCarService.saveOldCars(oldCarList, id);
        return ResponseDto.success("OldCars List Mapped Successfully",oldCars);
    }

    @GetMapping("/")
    @ApiOperation("Get All OldCar(s)")
    public ResponseDto<List<OldCar>> getAllOldCars()
    {
        return ResponseDto.success("OldCars List Fetched Successfully",oldCarService.getAllOldCars());
    }

    @GetMapping("/{id}")
    @ApiOperation("Get OldCar By Id")
    public ResponseDto<OldCar> getOldCarById(@PathVariable long id)
    {
        return ResponseDto.success("OldCar Details Fetched Successfully",oldCarService.getOldCarById(id));
    }

    @GetMapping("/city/{cityName}")
    @ApiOperation("Get All OldCar(s) in city")
    public ResponseDto<List<OldCar>> getAllOldCarsInCity(String cityName)
    {
        return ResponseDto.success("OldCars List Fetched Successfully",oldCarService.getAllOldCarsInCity(cityName));
    }

    @PostMapping("/compare")
    @ApiOperation("Compare Old Cars")
    public ResponseDto<List<OldCar>> compareOldCars(@RequestBody List<Long> oldCarIds)
    {
        return ResponseDto.success("Comparison result fetched successfully",oldCarService.compareOldCars(oldCarIds));
    }

    @PutMapping("/{id}/images")
    @ApiOperation("Update Images of Old Cars")
    public ResponseDto<List<String>> compareOldCars(@PathVariable Long id,
                                                    @RequestBody List<String> filePathList) {
        return ResponseDto.success("Updated Images for Old Cars", oldCarService.updateImages(id, filePathList));
    }


}
