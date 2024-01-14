package com.carbazaar.helperservice.repository;

import com.carbazaar.helperservice.entity.CityState;
import com.carbazaar.helperservice.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityStateRepository extends JpaRepository<CityState, Long> {
    public Optional<CityState> findByIdAndStateId(Long id, State state_id);

    public List<CityState> findAllByStateId(State state_id);

    boolean existsByCityNameIgnoreCase(String name);

    List<CityState> findAllByStatus(boolean status);

    public CityState findByCityName(String city);

    List<CityState> findAllByOrderByCityName();
}
