package com.techelevator.model;

public class GuestRef {
    private Long id;
    private Long outingId;
    private String guestEmail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
