package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.dto.InsuranceRequestDto;
import com.carbazzar.dealerservice.entity.Insurance;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.services.InsuranceService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/insurance")
@CrossOrigin
public class InsuranceController {

    @Autowired
    InsuranceService insuranceService;
    //get insurance by id

    //create insurance
    @PostMapping("/")
    @ApiOperation("Add Insurance(s) to DB")
    public ResponseDto<Insurance> addInsurances(InsuranceRequestDto insurance){
        return ResponseDto.success("Insurance Added To DB",insuranceService.createInsurance(insurance));
    }
}
