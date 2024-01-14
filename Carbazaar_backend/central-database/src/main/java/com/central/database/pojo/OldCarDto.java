package com.central.database.pojo;

import com.central.database.enums.BodyType;
import com.central.database.enums.FuelType;
import com.central.database.enums.TransmissionType;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OldCarDto {

    private String carName;
    private String variantName;
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType;
    @Enumerated(EnumType.STRING)
    private BodyType bodyType;
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
    private String frontTyreDesc;
    private String rearTyreDesc;
    private String seatUpholseryDetails;
    private int speakers;
    private String offerDetails;
    private String offerValidUpto;
    private boolean buybackGurantee;
    private String buybackGuranteeDetails;
    private boolean discountAvailable;
    private double discountPercentage;
    private BigDecimal dealerPrice;
}
