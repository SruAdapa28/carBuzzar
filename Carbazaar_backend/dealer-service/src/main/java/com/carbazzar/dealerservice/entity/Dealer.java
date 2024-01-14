package com.carbazzar.dealerservice.entity;

import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import com.carbazzar.dealerservice.enums.CarType;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="dealer")
public class Dealer extends AbstractJpaEntity {

    private String name;
    private String address;
    private String email;
    private long phone;
    private String state;
    private String city;
    @Enumerated(EnumType.STRING)
    private CarType carType;

    @OneToMany(mappedBy = "dealer", cascade = CascadeType.ALL)
    private List<Offers> offers;

//    @JoinColumn(name = "id")
//    @OneToOne
    private Brand brand;

    @OneToMany(mappedBy = "dealer",cascade = CascadeType.ALL)
    private List<OldCar> oldCars;

    @OneToMany(mappedBy = "dealer",cascade = CascadeType.ALL)
    private List<NewCar> newCars;

}
