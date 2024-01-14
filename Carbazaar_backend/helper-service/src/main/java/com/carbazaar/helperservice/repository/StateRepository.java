package com.carbazaar.helperservice.repository;

import com.carbazaar.helperservice.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
    State findByNameIgnoreCase(String state);
}
