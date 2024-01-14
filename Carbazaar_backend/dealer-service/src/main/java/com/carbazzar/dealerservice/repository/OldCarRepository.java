package com.carbazzar.dealerservice.repository;

import com.carbazzar.dealerservice.entity.OldCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OldCarRepository extends JpaRepository<OldCar,Long>,OldCarSearchRepository {
}
