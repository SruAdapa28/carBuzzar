package com.carbazaar.helperservice.utils;


import lombok.experimental.UtilityClass;
import org.springframework.beans.BeanUtils;

@UtilityClass
public class ObjectUtils {

    public <T> T createObjectByCopying(Object source, T destination) {
        BeanUtils.copyProperties(source, destination);
        return destination;
    }

}

