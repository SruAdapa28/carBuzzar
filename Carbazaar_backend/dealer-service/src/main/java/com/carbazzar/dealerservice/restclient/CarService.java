package com.carbazzar.dealerservice.restclient;

import com.carbazzar.dealerservice.dto.SearchDto;
import com.carbazzar.dealerservice.dto.SearchResultsDto;
import com.carbazzar.dealerservice.entity.Car;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

//@FeignClient(name="car-service",url = "localhost:8291")
@FeignClient(name="car-service",url = "https://car-service-urtjok3rza-wl.a.run.app")
public interface CarService {

    @PostMapping("/cars/search")
    ResponseDto<List<SearchResultsDto>> fetchCarVariants(@RequestBody SearchDto searchDto);

    @PostMapping("/cars/new")
    ResponseDto<List<Car>> fetchNewCarsInCity(@RequestBody List<String> carBrands);

    @PostMapping("/cars/latest")
    ResponseDto<List<Car>> fetchLatestCarsInCity(@RequestBody List<String> carBrands);

    @GetMapping("/variant/car/id/")
    long fetchVariantID(@RequestParam("carName") String carName,@RequestParam("variantName") String variantName);
}
