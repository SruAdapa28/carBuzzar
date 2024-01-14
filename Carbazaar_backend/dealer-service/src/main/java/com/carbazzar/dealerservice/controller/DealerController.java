package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.pojo.DealerRequestDto;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.services.DealerService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dealer")
@CrossOrigin
public class DealerController {

    @Autowired
    DealerService dealerService;

    @GetMapping("/{id}")
    @ApiOperation("Fetch single dealer by id")
    public Dealer getDealerById(@PathVariable Long id){
        return dealerService.getDealerById(id);
    }

    @DeleteMapping("/delete/{id}")
    @ApiOperation("Delete Dealer By Id")
    public ResponseDto<String> deleteDealerById(@PathVariable Long id)
    {
        dealerService.deleteDealerById(id);
        return ResponseDto.success("Dealer Data Deleted Successfully");
    }

    @GetMapping("/all/")
    @ApiOperation("Fetch All Dealers")
    public ResponseDto<List<Dealer>> fetchAllDealers()
    {
        return ResponseDto.success("All Dealers",dealerService.fetchAllDealers());
    }
    //create dealer
    @PostMapping("/")
    @ApiOperation("Add dealer(s) to database")
    public ResponseDto<List<Dealer>> addDealers(@RequestBody List<DealerRequestDto> dealers)
    {
        return ResponseDto.success("Dealers Added Successfully",dealerService.saveDealers(dealers));
    }


    //get Dealers In a city
    @GetMapping("/city/{city}")
    @ApiOperation(("Fetch dealer(s) by city"))
    public ResponseDto<List<Dealer>> findDealersInCity(@PathVariable String city)
    {
        return ResponseDto.success("Dealers In City Fetched Successfully",dealerService.findDealersInCity(city));
    }

    //get offers by a dealer
    //get old cars by a dealer
    //get insurances by a dealer

}
