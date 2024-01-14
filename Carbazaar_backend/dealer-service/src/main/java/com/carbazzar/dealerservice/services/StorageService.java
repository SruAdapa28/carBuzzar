package com.carbazzar.dealerservice.services;

import java.util.List;

public interface StorageService {

    String getSingleFileData(String filePath);

    List<String> getFileData(List<String> filePathList);

}
