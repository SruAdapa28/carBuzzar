package com.carbazaar.helperservice.entity;

import com.carbazaar.helperservice.entity.helper.AbstractJpaEntity;
import com.carbazaar.helperservice.pojo.StateDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name="state")
public class State extends AbstractJpaEntity {
    private String name;
    
}
