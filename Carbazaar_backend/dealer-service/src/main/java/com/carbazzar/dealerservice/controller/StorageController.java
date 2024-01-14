package com.carbazzar.dealerservice.controller;

import com.carbazzar.dealerservice.pojo.ResponseDto;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.IOException;
import java.util.*;

@RestController
@Log4j2
class StorageController {

    @Getter(AccessLevel.PROTECTED)
    @Setter(AccessLevel.PROTECTED)
    @Autowired
    private Storage storage;

    @Value("${gcs.bucketName}")
    private String bucketName;
    @Value("${gcs.bucket.subdirectory}")
    private String subdirectory;

    @PostMapping(value = "/upload")
    public ResponseDto<List<String>> uploadFile(@RequestPart("file") MultipartFile[] files) {

        List<String> fileNames = new ArrayList<>();

        Arrays.asList(files).forEach(file -> {
            log.info("Upload File : " + file.getContentType());
            log.info(("File name : " + file.getOriginalFilename()));
            String fileName = file.getOriginalFilename() + System.currentTimeMillis();
            byte[] byteArray = new byte[0];
            try {
                byteArray = file.getBytes();
            } catch (IOException e) {
                e.printStackTrace();
            }
            final BlobId blobId = constructBlobId(bucketName, subdirectory, fileName);

            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
            getStorage().create(blobInfo, byteArray);

            fileNames.add(fileName);
        });

        return ResponseDto.success("File uploaded successfully", fileNames);
    }

    @GetMapping("/download")
    public ResponseDto<String> downloadFile(@RequestParam String filePath) {
        byte[] byteArray = getStorage().get(constructBlobId(bucketName, subdirectory, filePath)).getContent(Blob.BlobSourceOption.generationMatch());
        String base64 = Base64.getEncoder().encodeToString(byteArray);
        return ResponseDto.success("Image Fetched", base64);
    }

    private BlobId constructBlobId(String bucketName, @Nullable String subdirectory,
                                   String fileName) {
        return Optional.ofNullable(subdirectory)
                .map(s -> BlobId.of(bucketName, subdirectory + "/" + fileName))
                .orElse(BlobId.of(bucketName, fileName));
    }

}