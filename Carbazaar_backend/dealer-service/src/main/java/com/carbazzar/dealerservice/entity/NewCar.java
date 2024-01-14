package com.carbazzar.dealerservice.entity;

import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import com.carbazzar.dealerservice.entity.helper.StringListConverter;
import com.carbazzar.dealerservice.enums.TransmissionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Entity
@Table(name = "newcar")
@ToString
public class NewCar extends AbstractJpaEntity {

    @Transient
    private long variantId;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dealerId",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Dealer dealer;

    public long getVariantId() {
        return variantId;
    }

    public void setVariantId(long variantId) {
        this.variantId = variantId;
    }

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

    public BigDecimal getExShowroomPrice() {
        return exShowroomPrice;
    }

    public void setExShowroomPrice(BigDecimal exShowroomPrice) {
        this.exShowroomPrice = exShowroomPrice;
    }

    public int getEngine() {
        return engine;
    }

    public void setEngine(int engine) {
        this.engine = engine;
    }

    public Double getMileage() {
        return mileage;
    }

    public void setMileage(Double mileage) {
        this.mileage = mileage;
    }

    public TransmissionType getTransmissionType() {
        return transmissionType;
    }

    public void setTransmissionType(TransmissionType transmissionType) {
        this.transmissionType = transmissionType;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public int getWatingPeriod() {
        return watingPeriod;
    }

    public void setWatingPeriod(int watingPeriod) {
        this.watingPeriod = watingPeriod;
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

    public boolean isFreeAccessories() {
        return freeAccessories;
    }

    public void setFreeAccessories(boolean freeAccessories) {
        this.freeAccessories = freeAccessories;
    }

    public String getFreeAccessoriesDetails() {
        return freeAccessoriesDetails;
    }

    public void setFreeAccessoriesDetails(String freeAccessoriesDetails) {
        this.freeAccessoriesDetails = freeAccessoriesDetails;
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

    public Long getDealerId()
    {
        return dealer.getId();
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
