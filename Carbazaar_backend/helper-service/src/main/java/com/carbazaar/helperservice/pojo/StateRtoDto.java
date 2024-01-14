package com.carbazaar.helperservice.pojo;

import com.carbazaar.helperservice.entity.State;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StateRtoDto {
    private Long id;
    private State state_id;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal rtoPricePercentage;
}
