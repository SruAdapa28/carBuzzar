package com.carbazaar.helperservice.service;

import com.carbazaar.helperservice.entity.CityState;
import com.carbazaar.helperservice.entity.State;
import com.carbazaar.helperservice.entity.StateRto;
import com.carbazaar.helperservice.exception.ApiValidationException;
import com.carbazaar.helperservice.exception.AssetNotFoundException;
import com.carbazaar.helperservice.pojo.CityDto;
import com.carbazaar.helperservice.pojo.CityStateDto;
import com.carbazaar.helperservice.pojo.RawCityStateDto;
import com.carbazaar.helperservice.pojo.StateDto;
import com.carbazaar.helperservice.repository.CityStateRepository;
import com.carbazaar.helperservice.repository.StateRepository;
import com.carbazaar.helperservice.repository.StateRtoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class HelperService {

    @Autowired
    private CityStateRepository cityStateRepository;

    @Autowired
    private StateRtoRepository stateRtoRepository;

    @Autowired
    private StateRepository stateRepository;

    public StateDto getStateById(Long id) {
        Mapper mapper = new Mapper();
        State newState;
        StateDto stateDto = new StateDto();
        Optional<State> state = stateRepository.findById(id);
        if (state.isPresent()) {
            newState = state.get();
            stateDto = mapper.convertToDto(newState);
        }
        return stateDto;
    }

    public State saveState(State state) {
        return stateRepository.save(state);
    }

    public CityStateDto getCityStateById(Long id, Long state_id) {
        Mapper mapper = new Mapper();
        CityState newCityState;
        CityStateDto cityStateDto = new CityStateDto();
        Optional<State> state = stateRepository.findById(state_id);
        if (state.isPresent()) {
            log.info(state.get().toString());
            Optional<CityState> cityState = cityStateRepository.findByIdAndStateId(id, state.get());
            log.info(cityState.get().toString());
            if (cityState.isPresent()) {
                newCityState = cityState.get();
                cityStateDto = mapper.convertToDto(newCityState);
            } else {
                throw new AssetNotFoundException("City with id not found");
            }
        } else {
            throw new AssetNotFoundException("State with id not found");
        }
        return cityStateDto;
    }

    public CityState saveCityState(CityState cityState) {
        return cityStateRepository.save(cityState);
    }

    public List<CityStateDto> getCityStateByStateId(Long state_id) {
        List<CityStateDto> cityStateDtoList = new ArrayList<>();
        Mapper mapper = new Mapper();
        CityStateDto cityStateDto = new CityStateDto();
        Optional<State> state = stateRepository.findById(state_id);
        if (state.isPresent()) {
            List<CityState> cityStateList = cityStateRepository.findAllByStateId(state.get());
            for (CityState cityState : cityStateList) {
                cityStateDto = mapper.convertToDto(cityState);
                cityStateDtoList.add(cityStateDto);
            }
        } else {
            throw new AssetNotFoundException("State with id not found");
        }
        return cityStateDtoList;
    }

    public List<StateRto> saveStateRto(List<StateRto> stateRtos) {
        List<StateRto> collect = stateRtos.stream().map(
                (stateRto) -> {
                    return stateRtoRepository.save(stateRto);
                }
        ).collect(Collectors.toList());
        return collect;
    }

    public void saveRawCityStateData(List<RawCityStateDto> rawCityStateDtoList) {
        if (CollectionUtils.isEmpty(rawCityStateDtoList)) {
            throw new ApiValidationException("Data is empty");
        }
        rawCityStateDtoList.forEach(rawCityStateDto -> {
            State state = Optional.ofNullable(stateRepository.findByNameIgnoreCase(rawCityStateDto.getState()))
                    .orElseGet(() -> stateRepository.save(State.builder().name(rawCityStateDto.getState()).build()));

            System.out.println("State " + state.getName());

            if (cityStateRepository.existsByCityNameIgnoreCase(rawCityStateDto.getName()) == Boolean.FALSE) {
                CityState cityState = CityState.builder()
                        .cityName(rawCityStateDto.getName())
                        .stateId(state)
                        .build();

                cityStateRepository.save(cityState);
            }

        });

        log.info("Saved Raw City State List");
    }

    public List<CityDto> fetchAllCities() {
        List<CityState> cityStateList = cityStateRepository.findAllByOrderByCityName();
        List<CityDto> response = new ArrayList<>();
        cityStateList.forEach(cityState -> {
            response.add(CityDto.builder()
                    .name(cityState.getCityName())
                    .id(cityState.getId())
                    .build());
        });
        return response;
    }

    public BigDecimal getRtoCharge(String city, BigDecimal price) {
        log.info("In helper service - getRtoCharge");
        CityState cityState = cityStateRepository.findByCityName(city);
        log.info(cityState.toString());
        log.info(cityState.getStateId().getId().toString());
        Optional<State> state = stateRepository.findById(cityState.getStateId().getId());
        log.info(state.get().toString());
        List<StateRto> stateRtoList = stateRtoRepository.findByStateId(state.get());
        log.info(stateRtoList.toString());
        BigDecimal rtoCharge = new BigDecimal(0);
        for (StateRto stateRto : stateRtoList) {
            if (price.compareTo(stateRto.getMinPrice()) >= 0 && price.compareTo(stateRto.getMaxPrice()) <= 0) {
                rtoCharge = price.multiply(stateRto.getRtoPricePercentage()).divide(BigDecimal.valueOf(100.00));
                log.info("rtoCharge " + rtoCharge);
                break;
            }
        }

        return rtoCharge;
    }

    public String deleteCity(long cityId)
    {
        cityStateRepository.deleteById(cityId);
        return "Success";
    }

    public String deleteAllCities()
    {
        cityStateRepository.deleteAll();
        return "Success";
    }
}
