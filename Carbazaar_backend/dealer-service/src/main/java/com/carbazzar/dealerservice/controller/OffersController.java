package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.entity.Offers;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.services.OffersService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offers")
@CrossOrigin
public class OffersController {

    @Autowired
    OffersService offersService;


    @PostMapping("/{id}")
    @ApiOperation("Save Offer(s) to DB")
    public ResponseDto<List<Offers>> saveOffers(@RequestBody List<Offers> offersList,@PathVariable("id") long dealerId){
        List<Offers> offers = offersService.saveOffers(offersList, dealerId);
        return ResponseDto.success("Offers Details Saved Successfully",offers);
    }
}
