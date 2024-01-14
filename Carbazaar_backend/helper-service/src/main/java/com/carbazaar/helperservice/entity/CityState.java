package com.carbazaar.helperservice.entity;

import com.carbazaar.helperservice.entity.helper.AbstractJpaEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name="city_state")
public class CityState extends AbstractJpaEntity {
    private String cityName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="stateId", referencedColumnName = "id")
    private State stateId;

}
