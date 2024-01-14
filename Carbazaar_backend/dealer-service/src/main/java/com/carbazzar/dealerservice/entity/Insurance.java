package com.carbazzar.dealerservice.entity;

import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name="insurance")
public class Insurance extends AbstractJpaEntity {

    private String name;
    private String description;
    private BigDecimal price;
    private String duration;
    @OneToMany
    private List<Dealer> dealer;
}
