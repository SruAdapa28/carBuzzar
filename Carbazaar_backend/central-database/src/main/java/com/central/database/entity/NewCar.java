package com.central.database.entity;

import com.central.database.entity.helper.AbstractJpaEntity;
import com.central.database.entity.helper.StringListConverter;
import com.central.database.enums.TransmissionType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Entity
@Table(name = "newcar")
@ToString
@Data
public class NewCar extends AbstractJpaEntity {
    private String carName;
    private String variantName;
    private BigDecimal exShowroomPrice;
    private int engine;
    private Double mileage;
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType;
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> colors;
    private int watingPeriod;
    @Column(columnDefinition = "TEXT")
    private String offerDetails;
    private String offerValidUpto;
    private boolean buybackGurantee;
    @Column(columnDefinition = "TEXT")
    private String buybackGuranteeDetails;
    private boolean freeAccessories;
    @Column(columnDefinition = "TEXT")
    private String freeAccessoriesDetails;
    private boolean discountAvailable;
    private double discountPercentage;
}
