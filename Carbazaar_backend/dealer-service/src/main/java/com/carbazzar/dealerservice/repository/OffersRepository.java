package com.carbazzar.dealerservice.repository;

import com.carbazzar.dealerservice.entity.Offers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OffersRepository extends JpaRepository<Offers, Long> {
}
