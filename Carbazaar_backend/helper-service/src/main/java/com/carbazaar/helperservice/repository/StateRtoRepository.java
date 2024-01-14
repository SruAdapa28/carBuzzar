package com.carbazaar.helperservice.repository;

import com.carbazaar.helperservice.entity.CityState;
import com.carbazaar.helperservice.entity.State;
import com.carbazaar.helperservice.entity.StateRto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateRtoRepository extends JpaRepository<StateRto, Long> {
    public Optional<StateRto> findByIdAndStateId(Long id, State state_id);

    public List<StateRto> findByStateId(State stateId);
}
