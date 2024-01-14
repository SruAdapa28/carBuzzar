package com.carbazzar.dealerservice.entity;

import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


@Entity
@NoArgsConstructor
@Table(name="offers")
@ToString
public class Offers extends AbstractJpaEntity {

    private BigDecimal discount_percentage;
    private Date expiry_date;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dealerId",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Dealer dealer;

    public BigDecimal getDiscount_percentage() {
        return discount_percentage;
    }

    public void setDiscount_percentage(BigDecimal discount_percentage) {
        this.discount_percentage = discount_percentage;
    }

    public Date getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(Date expiry_date) {
        this.expiry_date = expiry_date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
