package com.carbazzar.dealerservice.services;

import com.carbazzar.dealerservice.dto.SearchDto;
import com.carbazzar.dealerservice.dto.SearchResponseDto;

public interface SearchService {
    SearchResponseDto findSearchResult(SearchDto searchDto);
}
