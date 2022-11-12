package com.techelevator.model;

public class RestaurantRef {

    private Long id;
    private Long restaurantId;
    private Long outingId;
    private Long upvotes;
    private Long downvotes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Long getOutingId() {
        return outingId;
    }

    public void setOutingId(Long outingId) {
        this.outingId = outingId;
    }

    public Long getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(Long upvotes) {
        this.upvotes = upvotes;
    }

    public Long getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(Long downvotes) {
        this.downvotes = downvotes;
    }
}
