package com.carbazaar.helperservice.utils;


import com.carbazaar.helperservice.entity.StateRto;
import com.carbazaar.helperservice.pojo.StateRtoDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public class DtoAdapter {

    public StateRtoDto convertStateRtoEntityToDto(StateRto stateRto) {
        StateRtoDto stateRtoDto = ObjectUtils.createObjectByCopying(stateRto, new StateRtoDto());
        return stateRtoDto;
    }

}
