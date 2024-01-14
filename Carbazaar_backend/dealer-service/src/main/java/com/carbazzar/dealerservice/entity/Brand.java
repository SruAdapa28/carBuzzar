package com.carbazzar.dealerservice.entity;

import com.carbazzar.dealerservice.entity.helper.AbstractJpaEntity;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name="brand")
public class Brand extends AbstractJpaEntity {
    private String name;
    @JsonAlias("logoUrl")
    private String logo_url;
    private Boolean status;
}


