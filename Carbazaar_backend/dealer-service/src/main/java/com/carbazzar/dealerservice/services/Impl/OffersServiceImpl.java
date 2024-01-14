package com.carbazzar.dealerservice.services.Impl;

import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.entity.Offers;
import com.carbazzar.dealerservice.repository.DealerRepository;
import com.carbazzar.dealerservice.repository.OffersRepository;
import com.carbazzar.dealerservice.services.OffersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OffersServiceImpl implements OffersService {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    OffersRepository offersRepository;

    @Override
    public List<Offers> saveOffers(List<Offers> offers, Long dealerId) {

        Optional<Dealer> byId = dealerRepository.findById(dealerId);
        Dealer dealer = byId.get();

        offers.forEach(
                (offer) ->{
                    offer.setDealer(dealer);
                    offersRepository.save(offer);
                }
        );
        return offers;
    }
}
