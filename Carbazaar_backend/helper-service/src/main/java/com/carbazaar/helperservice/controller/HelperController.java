package com.carbazaar.helperservice.controller;

import com.carbazaar.helperservice.entity.CityState;
import com.carbazaar.helperservice.entity.State;
import com.carbazaar.helperservice.entity.StateRto;
import com.carbazaar.helperservice.pojo.*;
import com.carbazaar.helperservice.service.HelperService;
import com.carbazaar.helperservice.service.StateRtoService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/helper")
@CrossOrigin
public class HelperController {

    @Autowired
    private HelperService helperService;

    @Autowired
    private StateRtoService stateRtoService;

    @GetMapping("/state/{id}")
    @ResponseBody
    public ResponseDto<StateDto> getStateById(@PathVariable("id") Long id) {
        return ResponseDto.success("successfully retrieved", helperService.getStateById(id));
    }

    @PostMapping("/state")
    @ResponseBody
    public ResponseDto<State> insertState(@RequestBody State state) {
        log.info("Saving state " + state.toString());
        return ResponseDto.success("successfully saved", helperService.saveState(state));
    }

    @GetMapping("/cityState/city_id={id}&state_id={state_id}")
    @ResponseBody
    public ResponseDto<CityStateDto> getCityStateById(@PathVariable("id") Long id, @PathVariable("state_id") Long state_id) {
        return ResponseDto.success("CityState successfully retrieved", helperService.getCityStateById(id, state_id));
    }

    @PostMapping("/cityState")
    @ResponseBody
    public ResponseDto<CityState> insertCityState(@RequestBody CityState cityState) {
        log.info("Saving CityState " + cityState.toString());
        return ResponseDto.success("successfully saved", helperService.saveCityState(cityState));
    }

    @GetMapping("/cityState/state_id={state_id}")
    @ResponseBody
    public ResponseDto<List<CityStateDto>> getCityStateByStateId(@PathVariable("state_id") Long state_id) {
        return ResponseDto.success("CityState successfully retrieved", helperService.getCityStateByStateId(state_id));
    }

    @PostMapping("/stateRto")
    @ResponseBody
    public ResponseDto<List<StateRto>> insertStateRto(@RequestBody List<StateRto> stateRto) {
        log.info("Saving StateRto " + stateRto.toString());
        return ResponseDto.success("successfully saved", helperService.saveStateRto(stateRto));
    }

    @PostMapping("/rawDataForCities")
    public ResponseDto<Void> insertRawCityStateData(@RequestBody List<RawCityStateDto> rawCityStateDtoList) {
        log.info("Saving raw city state list");
        helperService.saveRawCityStateData(rawCityStateDtoList);
        return ResponseDto.success("Successfully saved");
    }

    @GetMapping("/cities")
    public ResponseDto<List<CityDto>> fetchAllCities() {
        return ResponseDto.success("City list fetched successfully", helperService.fetchAllCities());
    }

    @GetMapping("/city/stateRto/city={city}&price={price}")
    @ResponseBody
    public ResponseDto<BigDecimal> getRtoCharge(@PathVariable("city") String city, @PathVariable("price") BigDecimal price) {
        log.info("get RtoCharge by city and price " + city.toString() + " " + price.toString());

        return ResponseDto.success("Retrieving rto charge", helperService.getRtoCharge(city, price));
    }

    @GetMapping("/rtocharges")
    @ApiOperation(value = "Get Rto Charges By CityName")
    public ResponseDto<List<StateRtoDto>> getRtoCharges(@RequestParam String cityName)
    {
        return ResponseDto.success("City Rto Charges",stateRtoService.findRtoCharges(cityName));
    }

    @DeleteMapping("/delete/city/{id}")
    @ApiOperation(value = "Delete City By Id")
    public ResponseDto<String> deleteCityById(@PathVariable long id)
    {
        return ResponseDto.success("City Data Deleted.. ",helperService.deleteCity(id));
    }

    @DeleteMapping("/delete/cities")
    @ApiOperation(value = "Delete All City")
    public ResponseDto<String> deleteAllCity()
    {
        return ResponseDto.success("Delete All City ",helperService.deleteAllCities());
    }
}
