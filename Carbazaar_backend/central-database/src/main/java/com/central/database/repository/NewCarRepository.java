package com.central.database.repository;

import com.central.database.entity.NewCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewCarRepository extends JpaRepository<NewCar,Long> {
}
