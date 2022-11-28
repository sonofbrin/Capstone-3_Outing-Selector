package com.techelevator.model;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Component
public class StringToGuestIdConverter implements Converter<String, GuestId> {

    @Override
    public GuestId convert(@NotNull String s) {
        return new GuestId(UUID.fromString(s));
    }
}
