package com.central.database.entity;

import com.central.database.entity.helper.AbstractJpaEntity;
import com.central.database.entity.helper.StringListConverter;
import com.central.database.enums.BodyType;
import com.central.database.enums.FuelType;
import com.central.database.enums.TransmissionType;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "oldcar")
@NoArgsConstructor
@ToString
public class OldCar extends AbstractJpaEntity {

    private String carName;
    private String variantName;
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType;
    @Enumerated(EnumType.STRING)
    private BodyType bodyType;
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> imageUrlList;
    private boolean accidentHistory;
    private String accidentHistoryDetails;
    private int kilometersDriven;
    private String insuranceLastDate;
    private String insuranceDescription;
    private String ownerStatus;
    private String yearOfPurchase;
    private String registration;
    private double currentMileage;
    private boolean cdPlayer;
    private boolean mp3Playback;
    private boolean usbCompatibility;
    private boolean auxCompatibility;
    @Column(columnDefinition = "TEXT")
    private String frontTyreDesc;
    @Column(columnDefinition = "TEXT")
    private String rearTyreDesc;
    private String seatUpholseryDetails;
    private int speakers;
    @Column(columnDefinition = "TEXT")
    private String offerDetails;
    private String offerValidUpto;
    private boolean buybackGurantee;
    @Column(columnDefinition = "TEXT")
    private String buybackGuranteeDetails;
    private boolean discountAvailable;
    private double discountPercentage;
    private BigDecimal dealerPrice;
}
