package com.carbazzar.dealerservice.services.Impl;

import com.carbazzar.dealerservice.adapter.DtoAdapter;
import com.carbazzar.dealerservice.dto.OldCarResponseDto;
import com.carbazzar.dealerservice.dto.SearchDto;
import com.carbazzar.dealerservice.dto.SearchResponseDto;
import com.carbazzar.dealerservice.dto.SearchResultsDto;
import com.carbazzar.dealerservice.entity.Dealer;
import com.carbazzar.dealerservice.entity.OldCar;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.repository.DealerRepository;
import com.carbazzar.dealerservice.repository.OldCarRepository;
import com.carbazzar.dealerservice.restclient.CarService;
import com.carbazzar.dealerservice.services.OldCarService;
import com.carbazzar.dealerservice.services.SearchService;
import com.carbazzar.dealerservice.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    OldCarRepository oldCarRepository;

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    StorageService storageService;

    @Autowired
    CarService carService;
    @Override
    public SearchResponseDto findSearchResult(SearchDto searchDto) {

        SearchResponseDto searchResponseDto = new SearchResponseDto();
        if(searchDto.getCarType().trim().equalsIgnoreCase("Used"))
        {
            List<OldCar> searchResults = oldCarRepository.findSearchResults(searchDto);
            List<OldCarResponseDto> oldCarResponseDtoList = new ArrayList<>();

            oldCarResponseDtoList = searchResults.stream().map(oldCar -> {
                OldCarResponseDto oldCarResponseDto = DtoAdapter.convertOldCarIntoOldCarResponseDto(oldCar);
                oldCarResponseDto.setImageUrlList(storageService.getFileData(oldCarResponseDto.getImageUrlList()));
                return oldCarResponseDto;
            }).collect(Collectors.toList());
            searchResponseDto.setOldCars(oldCarResponseDtoList);
        }else{
            List<SearchResultsDto> data = new ArrayList<>();
            List<Dealer> dealers = dealerRepository.findByCity(searchDto.getCity());
            Set<String> brandNameSet = new HashSet<>();
            for (Dealer dealer : dealers) {
                brandNameSet.add(dealer.getBrand().getName());
            }
            List<String> brandNames = brandNameSet.stream().collect(Collectors.toList());
            searchDto.setBrandNames(brandNames);
            ResponseDto<List<SearchResultsDto>> listResponseDto = carService.fetchCarVariants(searchDto);
            System.out.println(listResponseDto.getMessage());
            data = listResponseDto.getData();
            searchResponseDto.setNewCars(data);
        }
        return searchResponseDto;
    }
}
