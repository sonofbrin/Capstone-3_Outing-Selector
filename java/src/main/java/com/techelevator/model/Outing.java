package com.techelevator.model;

import java.time.LocalDateTime;
import java.util.Set;

public class Outing {

    private Long id;
    private Long inviterId;
    private LocalDateTime dateTime;
    private LocalDateTime decisionTime;
    private Set<RestaurantRef> outingRestaurants;
    private Set<GuestRef> outingGuests;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInviterId() {
        return inviterId;
    }

    public void setInviterId(Long inviterId) {
        this.inviterId = inviterId;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public LocalDateTime getDecisionTime() {
        return decisionTime;
    }

    public void setDecisionTime(LocalDateTime decisionTime) {
        this.decisionTime = decisionTime;
    }

    public Set<RestaurantRef> getOutingRestaurants() {
        return outingRestaurants;
    }

    public void setOutingRestaurants(Set<RestaurantRef> outingRestaurants) {
        this.outingRestaurants = outingRestaurants;
    }

    public Set<GuestRef> getOutingGuests() {
        return outingGuests;
    }

    public void setOutingGuests(Set<GuestRef> outingGuests) {
        this.outingGuests = outingGuests;
    }
}
