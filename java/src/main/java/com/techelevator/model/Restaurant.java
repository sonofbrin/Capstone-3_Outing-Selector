package com.techelevator.model;

import javax.validation.constraints.NotBlank;
import java.util.Set;

public class Restaurant {

    private Long id;
    @NotBlank
    private String name;
    private String address;
    @NotBlank
    private String city;
    private String state;
    @NotBlank
    private String zip;
    private String imgUrl;
    private Set<TagRef> restaurantTags;
    private Hours restaurantHours;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Set<TagRef> getRestaurantTags() {
        return restaurantTags;
    }

    public void setRestaurantTags(Set<TagRef> restaurantTags) {
        this.restaurantTags = restaurantTags;
    }

    public Hours getRestaurantHours() {
        return restaurantHours;
    }

    public void setRestaurantHours(Hours restaurantHours) {
        this.restaurantHours = restaurantHours;
    }
}
