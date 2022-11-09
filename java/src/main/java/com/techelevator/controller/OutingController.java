package com.techelevator.controller;

import com.techelevator.dao.OutingDao;
import com.techelevator.dao.RestaurantDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Outing;
import com.techelevator.model.Restaurant;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class OutingController {

    private RestaurantDao restaurantDao;
    private OutingDao outingDao;
    private UserDao userDao;

    public OutingController(RestaurantDao restaurantDao, OutingDao outingDao, UserDao userDao) {
        this.restaurantDao = restaurantDao;
        this.outingDao = outingDao;
        this.userDao = userDao;
    }

    @PostMapping(value = "restaurant")
    Long addNewRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantDao.addRestaurant(restaurant);
    }

    @GetMapping(value = "restaurant/{id}")
    Restaurant getRestaurantById(@PathVariable Long id) {
        return restaurantDao.findRestaurantById(id);
    }

    @GetMapping(value = "restaurant/search")
    List<Restaurant> getRestaurantsByLocation(@RequestParam String location) {
        return restaurantDao.findRestaurantsByLocation(location);
    }

    @PostMapping(value = "outing")
    Long createNewOuting(@RequestBody Outing outing) {
        return outingDao.createNewOuting(outing);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "outing")
    List<Outing> getUserOutings(Principal principal) {
        Long userId = userDao.findByUsername(principal.getName()).getId();
        return outingDao.findOutingsByInviterId(userId);
    }
}
