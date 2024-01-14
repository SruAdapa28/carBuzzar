package com.carbazzar.dealerservice.entity;


import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import com.carbazzar.dealerservice.entity.helper.StringListConverter;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Car {

    @JsonAlias("id")
    private String id;
    private String name;
    private Brand brand;
    private List<String> imageUrlList;
    private Integer manufacturingYear;
    private Integer seatCapacity;
    //@JsonIgnore
    private List<Variant> variants;
}
