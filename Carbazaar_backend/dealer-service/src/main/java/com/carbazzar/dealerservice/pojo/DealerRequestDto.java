package com.carbazzar.dealerservice.pojo;

import com.carbazzar.dealerservice.enums.CarType;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DealerRequestDto {
    private String name;
    private String address;
    private String email;
    private long phone;
    private String state;
    private String city;
    @Enumerated(EnumType.STRING)
    private CarType carType;
    private String brandName;
}
