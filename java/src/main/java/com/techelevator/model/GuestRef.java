package com.techelevator.model;


public class GuestRef {
    private GuestId id;
    private Long outingId;
    private String guestEmail;

    public GuestId getId() {
        return id;
    }

    public void setId(GuestId id) {
        this.id = id;
    }

    public Long getOutingId() {
        return outingId;
    }

    public void setOutingId(Long outingId) {
        this.outingId = outingId;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }
}
