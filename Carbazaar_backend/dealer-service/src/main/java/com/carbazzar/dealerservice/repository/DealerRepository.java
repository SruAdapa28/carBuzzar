package com.carbazzar.dealerservice.repository;

import com.carbazzar.dealerservice.entity.Dealer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealerRepository extends JpaRepository<Dealer, Long> {
    List<Dealer> findByCity(String city);
}

