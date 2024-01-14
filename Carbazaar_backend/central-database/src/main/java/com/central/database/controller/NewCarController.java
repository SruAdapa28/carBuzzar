package com.central.database.controller;

import com.central.database.pojo.NewCarDto;
import com.central.database.pojo.ResponseDto;
import com.central.database.service.NewCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping("/cars/new")
public class NewCarController {

    private NewCarService newCarService;

    @PostMapping("/")
    public ResponseDto<List<NewCarDto>> saveNewCars(@RequestBody List<NewCarDto> newCarDtoList) {
        return ResponseDto.success("Saved New Cars", newCarService.saveNewCars(newCarDtoList));
    }

    @GetMapping("/{id}")
    public ResponseDto<NewCarDto> fetchNewCarById(@RequestParam Long id) {
        return ResponseDto.success("Fetched car with id : " + id, newCarService.fetchNewCarById(id));
    }

    @PutMapping("/{id}")
    public ResponseDto<NewCarDto> updateNewCar(@RequestParam Long id, @RequestBody NewCarDto newCarDto) {
        return ResponseDto.success("Updated car with id : " + id, newCarService.updateNewCar(newCarDto, id));
    }

    @GetMapping("/")
    public ResponseDto<List<NewCarDto>> getAllNewCars() {
        return ResponseDto.success("Fetched all used cars", newCarService.fetchAllCars());
    }

}
