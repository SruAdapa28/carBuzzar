package com.carbazaar.helperservice.service;

import com.carbazaar.helperservice.entity.*;
import com.carbazaar.helperservice.pojo.*;
import com.carbazaar.helperservice.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class Mapper {

    @Autowired
    StateRepository stateRepository;


    public StateDto convertToDto(State state){
        StateDto stateDto = new StateDto();
        stateDto.setId(state.getId());
        stateDto.setName(state.getName());
        return stateDto;
    }

    public CityStateDto convertToDto(CityState cityState){
        CityStateDto cityStateDto = new CityStateDto();
        cityStateDto.setId(cityState.getId());
        cityStateDto.setCityName(cityState.getCityName());
        cityStateDto.setState_id(cityState.getStateId());
        return cityStateDto;
    }

    public StateRtoDto convertToDto(StateRto stateRto){
        StateRtoDto stateRtoDto = new StateRtoDto();
        stateRtoDto.setId(stateRto.getId());
        stateRtoDto.setMaxPrice(stateRto.getMaxPrice());
        stateRtoDto.setMinPrice(stateRto.getMinPrice());
        stateRtoDto.setRtoPricePercentage(stateRto.getRtoPricePercentage());
        stateRtoDto.setState_id(stateRto.getStateId());
        return stateRtoDto;
    }
}
