package com.techelevator.dao;

import com.techelevator.model.Hours;
import com.techelevator.model.Restaurant;
import com.techelevator.model.TagRef;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class JdbcRestaurantDao implements RestaurantDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcRestaurantDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Long addRestaurant(Restaurant restaurant) {
        //TODO Add entries into restaurant_tag and hours tables
        String insertRestaurant = "INSERT INTO restaurant (name, address, city, state, zip, img_url) VALUES(?, ?, ?, ?, ?, ?) RETURNING id";
        Long id = jdbcTemplate.queryForObject(insertRestaurant, Long.class, restaurant.getName(), restaurant.getAddress(),
                restaurant.getCity(), restaurant.getState(), restaurant.getZip(), restaurant.getImgUrl());
        return id;
    }

    @Override
    public Restaurant findRestaurantById(Long id) {
        String sql = "SELECT * FROM restaurant WHERE id=?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        if (results.next()) {
            return mapRowToRestaurant(results);
        } else {
            throw new RuntimeException("Restaurant Id: " + id + " not found.");
        }
    }

    @Override
    public List<Restaurant> findRestaurantsByLocation(String location) {
        List<Restaurant> restaurants = new ArrayList<>();
        String sql = "SELECT * FROM restaurant WHERE (zip=? OR city=?)";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, location, location);
        while (results.next()) {
            Restaurant restaurant = mapRowToRestaurant(results);
            restaurants.add(restaurant);
        }
        return restaurants;
    }
    private Hours findRestaurantHours(Long restaurantId) {
        //TODO Return corresponding hours row for restaurant Id
        return null;
    }
    private Set<TagRef> findRestaurantTags(Long restaurantId) {
        // TODO Build a set of TagRefs with restaurant ids matching restaurant
        return null;
    }

    private Restaurant mapRowToRestaurant(SqlRowSet results) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(results.getLong("id"));
        restaurant.setName(results.getString("name"));
        restaurant.setAddress(results.getString("address"));
        restaurant.setCity(results.getString("city"));
        restaurant.setState(results.getString("state"));
        restaurant.setZip(results.getString("zip"));
        restaurant.setImgUrl(results.getString("img_url"));
        restaurant.setRestaurantHours(findRestaurantHours(restaurant.getId()));
        restaurant.setRestaurantTags(findRestaurantTags(restaurant.getId()));
        return restaurant;
    }

}
