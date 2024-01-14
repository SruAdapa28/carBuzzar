package com.carbazaar.helperservice.entity;

import com.carbazaar.helperservice.entity.helper.AbstractJpaEntity;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name="state_rto")
public class StateRto extends AbstractJpaEntity {

    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal rtoPricePercentage;
    @ManyToOne
    @JoinColumn(name="stateId", referencedColumnName = "id")
    private State stateId;
}
