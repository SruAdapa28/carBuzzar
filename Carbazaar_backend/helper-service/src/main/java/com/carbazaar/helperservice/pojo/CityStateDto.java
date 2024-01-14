package com.carbazaar.helperservice.pojo;

import com.carbazaar.helperservice.entity.State;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CityStateDto {
    private Long id;
    private String cityName;
    private State state_id;
}
