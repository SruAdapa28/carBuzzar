package com.carbazaar.helperservice.pojo;

import lombok.*;

import javax.persistence.Lob;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {

    private Long id;
    private String name;
    @Lob
    private String logo_url;
}
