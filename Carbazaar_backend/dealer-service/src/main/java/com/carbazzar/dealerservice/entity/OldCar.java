package com.carbazzar.dealerservice.entity;

import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import com.carbazzar.dealerservice.entity.helper.StringListConverter;
import com.carbazzar.dealerservice.enums.BodyType;
import com.carbazzar.dealerservice.enums.FuelType;
import com.carbazzar.dealerservice.enums.TransmissionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dealerId",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Dealer dealer;


    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public String getVariantName() {
        return variantName;
    }

    public void setVariantName(String variantName) {
        this.variantName = variantName;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public TransmissionType getTransmissionType() {
        return transmissionType;
    }

    public void setTransmissionType(TransmissionType transmissionType) {
        this.transmissionType = transmissionType;
    }

    public void setBodyType(BodyType bodyType) {
        this.bodyType = bodyType;
    }

    public List<String> getImageUrlList() {
        return imageUrlList;
    }

    public void setImageUrlList(List<String> imageUrlList) {
        this.imageUrlList = imageUrlList;
    }

    public boolean isAccidentHistory() {
        return accidentHistory;
    }

    public void setAccidentHistory(boolean accidentHistory) {
        this.accidentHistory = accidentHistory;
    }

    public String getAccidentHistoryDetails() {
        return accidentHistoryDetails;
    }

    public void setAccidentHistoryDetails(String accidentHistoryDetails) {
        this.accidentHistoryDetails = accidentHistoryDetails;
    }

    public int getKilometersDriven() {
        return kilometersDriven;
    }

    public void setKilometersDriven(int kilometersDriven) {
        this.kilometersDriven = kilometersDriven;
    }

    public String getInsuranceLastDate() {
        return insuranceLastDate;
    }

    public void setInsuranceLastDate(String insuranceLastDate) {
        this.insuranceLastDate = insuranceLastDate;
    }

    public String getInsuranceDescription() {
        return insuranceDescription;
    }

    public void setInsuranceDescription(String insuranceDescription) {
        this.insuranceDescription = insuranceDescription;
    }

    public String getOwnerStatus() {
        return ownerStatus;
    }

    public void setOwnerStatus(String ownerStatus) {
        this.ownerStatus = ownerStatus;
    }

    public String getYearOfPurchase() {
        return yearOfPurchase;
    }

    public void setYearOfPurchase(String yearOfPurchase) {
        this.yearOfPurchase = yearOfPurchase;
    }

    public String getRegistration() {
        return registration;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }

    public double getCurrentMileage() {
        return currentMileage;
    }

    public void setCurrentMileage(double currentMileage) {
        this.currentMileage = currentMileage;
    }

    public boolean isCdPlayer() {
        return cdPlayer;
    }

    public void setCdPlayer(boolean cdPlayer) {
        this.cdPlayer = cdPlayer;
    }

    public boolean isMp3Playback() {
        return mp3Playback;
    }

    public void setMp3Playback(boolean mp3Playback) {
        this.mp3Playback = mp3Playback;
    }

    public boolean isUsbCompatibility() {
        return usbCompatibility;
    }

    public void setUsbCompatibility(boolean usbCompatibility) {
        this.usbCompatibility = usbCompatibility;
    }

    public boolean isAuxCompatibility() {
        return auxCompatibility;
    }

    public void setAuxCompatibility(boolean auxCompatibility) {
        this.auxCompatibility = auxCompatibility;
    }

    public String getFrontTyreDesc() {
        return frontTyreDesc;
    }

    public void setFrontTyreDesc(String frontTyreDesc) {
        this.frontTyreDesc = frontTyreDesc;
    }

    public String getRearTyreDesc() {
        return rearTyreDesc;
    }

    public void setRearTyreDesc(String rearTypeDesc) {
        this.rearTyreDesc = rearTyreDesc;
    }

    public String getSeatUpholseryDetails() {
        return seatUpholseryDetails;
    }

    public void setSeatUpholseryDetails(String seatUpholseryDetails) {
        this.seatUpholseryDetails = seatUpholseryDetails;
    }

    public int getSpeakers() {
        return speakers;
    }

    public void setSpeakers(int speakers) {
        this.speakers = speakers;
    }

    public String getOfferDetails() {
        return offerDetails;
    }

    public void setOfferDetails(String offerDetails) {
        this.offerDetails = offerDetails;
    }

    public String getOfferValidUpto() {
        return offerValidUpto;
    }

    public void setOfferValidUpto(String offerValidUpto) {
        this.offerValidUpto = offerValidUpto;
    }

    public boolean isBuybackGurantee() {
        return buybackGurantee;
    }

    public void setBuybackGurantee(boolean buybackGurantee) {
        this.buybackGurantee = buybackGurantee;
    }

    public String getBuybackGuranteeDetails() {
        return buybackGuranteeDetails;
    }

    public void setBuybackGuranteeDetails(String buybackGuranteeDetails) {
        this.buybackGuranteeDetails = buybackGuranteeDetails;
    }

    public boolean isDiscountAvailable() {
        return discountAvailable;
    }

    public void setDiscountAvailable(boolean discountAvailable) {
        this.discountAvailable = discountAvailable;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public BigDecimal getDealerPrice() {
        return dealerPrice;
    }

    public void setDealerPrice(BigDecimal dealerPrice) {
        this.dealerPrice = dealerPrice;
    }

    public Long getDealerId()
    {
        return dealer.getId();
    }

    public Brand getBrand(){
        return dealer.getBrand();
    }

    public String getDealerName()
    {
        return dealer.getName();
    }

    public List<Offers> getOffer()
    {
        return dealer.getOffers();
    }

    @JsonIgnore
    public Dealer getDealer() {
        return dealer;
    }

    @JsonIgnore
    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }
}
