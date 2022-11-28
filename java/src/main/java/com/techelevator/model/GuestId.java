package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.UUID;

public class GuestId {

    @JsonValue
    private UUID id;

    public GuestId(UUID id){
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return id.toString();
    }

    @JsonCreator
    public static GuestId fromString(String id) {
        return new GuestId(UUID.fromString(id));
    }
}
