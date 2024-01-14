package com.carbazzar.dealerservice.services.Impl;

import com.carbazzar.dealerservice.adapter.DtoAdapter;
import com.carbazzar.dealerservice.dto.InsuranceRequestDto;
import com.carbazzar.dealerservice.entity.Insurance;
import com.carbazzar.dealerservice.repository.InsuranceRepository;
import com.carbazzar.dealerservice.services.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceServiceImpl implements InsuranceService {

    @Autowired
    InsuranceRepository insuranceRepository;

    @Override
    public Insurance createInsurance(InsuranceRequestDto insuranceDto) {
        final Insurance insurance = DtoAdapter.convertInsuranceDtoToEntity(insuranceDto);
        return insuranceRepository.save(insurance);
    }
}
