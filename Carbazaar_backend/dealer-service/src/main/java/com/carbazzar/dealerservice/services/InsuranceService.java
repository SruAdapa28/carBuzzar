package com.carbazzar.dealerservice.services;

import com.carbazzar.dealerservice.dto.InsuranceRequestDto;
import com.carbazzar.dealerservice.entity.Insurance;
import org.springframework.stereotype.Service;

@Service
public interface InsuranceService {
    Insurance createInsurance(InsuranceRequestDto insurance);
}
