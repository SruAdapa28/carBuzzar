package com.carbazzar.dealerservice.services;

import com.carbazzar.dealerservice.entity.Offers;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OffersService {
    List<Offers> saveOffers(List<Offers> offers,Long dealerId);
}
