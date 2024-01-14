package com.central.database.repository;

import com.central.database.entity.OldCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OldCarRepository extends JpaRepository<OldCar, Long> {
}
