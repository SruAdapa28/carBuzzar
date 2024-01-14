package com.carbazaar.helperservice.service;

import com.carbazaar.helperservice.entity.CityState;
import com.carbazaar.helperservice.entity.State;
import com.carbazaar.helperservice.entity.StateRto;
import com.carbazaar.helperservice.pojo.StateRtoDto;
import com.carbazaar.helperservice.repository.CityStateRepository;
import com.carbazaar.helperservice.repository.StateRtoRepository;
import com.carbazaar.helperservice.utils.DtoAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StateRtoService {

    @Autowired
    StateRtoRepository stateRtoRepository;
    @Autowired
    CityStateRepository cityStateRepository;

    public List<StateRtoDto> findRtoCharges(String cityName)
    {
        CityState city = cityStateRepository.findByCityName(cityName);
        State stateId = city.getStateId();
        List<StateRto> stateRtoList = stateRtoRepository.findByStateId(stateId);
        return stateRtoList.stream().map(stateRto -> DtoAdapter.convertStateRtoEntityToDto(stateRto)).collect(Collectors.toList());
    }
}
