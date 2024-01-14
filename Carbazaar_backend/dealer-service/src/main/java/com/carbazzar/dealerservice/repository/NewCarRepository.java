package com.carbazzar.dealerservice.repository;

import com.carbazzar.dealerservice.entity.NewCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewCarRepository extends JpaRepository<NewCar, Long>,NewCarSearchRepository {
}
