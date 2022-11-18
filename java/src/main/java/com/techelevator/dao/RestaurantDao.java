package com.techelevator.dao;

import com.techelevator.model.Restaurant;
import com.techelevator.model.Tag;
import com.techelevator.model.TagRef;

import java.util.List;

public interface RestaurantDao {

    Long addRestaurant(Restaurant restaurant);

    Long insertRestaurantTag(TagRef restaurantTag);

    Restaurant findRestaurantById(Long id);

    List<Restaurant> findRestaurantsByLocation(String location);

    Long addTag(Tag tag);

    List<Tag> getAllTags();

    Tag getTagById(Long id);

}
