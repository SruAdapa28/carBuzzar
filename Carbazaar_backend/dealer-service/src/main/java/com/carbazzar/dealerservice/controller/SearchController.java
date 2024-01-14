package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.dto.SearchDto;
import com.carbazzar.dealerservice.dto.SearchResponseDto;
import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.carbazzar.dealerservice.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin
public class SearchController {

    @Autowired
    SearchService searchService;

    @PostMapping("/")
    public ResponseDto<SearchResponseDto> findSearchResults(@RequestBody SearchDto searchRequest)
    {
        return ResponseDto.success("Search Result Fetched",searchService.findSearchResult(searchRequest));
    }
}
