package com.techelevator.dao;

import com.techelevator.model.Hours;
import com.techelevator.model.Restaurant;
import com.techelevator.model.TagRef;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
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
        String insertRestaurant = "INSERT INTO restaurant (name, address, city, state, zip, img_url) VALUES(?, ?, ?, ?, ?, ?) RETURNING id";
        Long id = jdbcTemplate.queryForObject(insertRestaurant, Long.class, restaurant.getName(), restaurant.getAddress(),
                restaurant.getCity(), restaurant.getState(), restaurant.getZip(), restaurant.getImgUrl());
        insertHours(id, restaurant.getRestaurantHours());
        insertTagRefs(id, restaurant.getRestaurantTags());
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
        String sql = "SELECT * FROM hours WHERE restaurant_id = ?";
        return jdbcTemplate.queryForObject(sql, Hours.class, restaurantId);
    }

    private Set<TagRef> findRestaurantTags(Long restaurantId) {
        Set<TagRef> tags = new HashSet<>();
        String sql = "SELECT * FROM restaurant_tag WHERE restaurant_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, restaurantId);
        while (results.next()) {
            tags.add(mapRowToTagRef(results));
        }
        return tags;
    }

    private TagRef mapRowToTagRef(SqlRowSet results) {
        TagRef tag = new TagRef();
        tag.setId(results.getLong("id"));
        tag.setRestaurantId(results.getLong("restaurant_id"));
        tag.setTagId(results.getLong("tag_id"));
        return tag;
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

    private void insertHours(long restaurantId, Hours hours) {
        String insertHours = "INSERT INTO hours (restaurant_id, open, close) VALUES(?, ?, ?)";
        jdbcTemplate.update(insertHours, restaurantId, hours.getOpenTime(), hours.getCloseTime());
    }

    private void insertTagRefs(long restaurantId, Set<TagRef> tags) {
        String insertTagRef = "INSERT INTO restaurant_tag (restaurant_id, tag_id) VALUES(?, ?)";
        for (TagRef tag : tags) {
            jdbcTemplate.update(insertTagRef, restaurantId, tag.getTagId());
        }
    }
}
