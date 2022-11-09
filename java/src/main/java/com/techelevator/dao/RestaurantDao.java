package com.techelevator.dao;

import com.techelevator.model.Restaurant;

import java.util.List;

public interface RestaurantDao {

    Long addRestaurant(Restaurant restaurant);

    Restaurant findRestaurantById(Long id);

    List<Restaurant> findRestaurantsByLocation(String location);

}
