package com.carbazzar.dealerservice.services;

import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.pojo.DealerRequestDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DealerService {

    public Dealer getDealerById(long id);

    public List<Dealer> fetchAllDealers();

    public void deleteDealerById(Long id);

    List<Dealer> saveDealers(List<DealerRequestDto> dealerList);

    List<Dealer> findDealersInCity(String city);
}
