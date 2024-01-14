package com.central.database.controller;

import com.central.database.pojo.OldCarDto;
import com.central.database.pojo.ResponseDto;
import com.central.database.service.UsedCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping("/cars/used")
public class UsedCarController {

    private final UsedCarService usedCarService;

    @PostMapping("/")
    public ResponseDto<List<OldCarDto>> saveOldCars(@RequestBody List<OldCarDto> oldCarDtoList) {
        return ResponseDto.success("Saved Old Cars", usedCarService.saveOldCars(oldCarDtoList));
    }

    @GetMapping("/{id}")
    public ResponseDto<OldCarDto> fetchOldCarById(@RequestParam Long id) {
        return ResponseDto.success("Fetched car with id : " + id, usedCarService.fetchOldCarById(id));
    }

    @PutMapping("/{id}")
    public ResponseDto<OldCarDto> updateUsedCar(@RequestParam Long id, @RequestBody OldCarDto oldCarDto) {
        return ResponseDto.success("Updated car with id : " + id, usedCarService.updateUsedCar(oldCarDto, id));
    }

    @GetMapping("/")
    public ResponseDto<List<OldCarDto>> getAllUsedCars() {
        return ResponseDto.success("Fetched all used cars", usedCarService.fetchAllCars());
    }

}
