package com.techelevator.controller;

import com.techelevator.dao.OutingDao;
import com.techelevator.dao.RestaurantDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public List<Restaurant> addNewRestaurant(@RequestBody Restaurant[] restaurants) {
        List<Restaurant> createdRestaurants = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            Long id = restaurantDao.addRestaurant(restaurant);
            if (id != null) {
                restaurant.setId(id);
                createdRestaurants.add(restaurant);
                for (TagRef restaurantTag: restaurant.getRestaurantTags()) {
                    restaurantTag.setRestaurantId(restaurant.getId());
                    restaurantTag.setId(restaurantDao.insertRestaurantTag(restaurantTag));
                }
            }
        }
        return createdRestaurants;
    }

    @GetMapping(value = "restaurant/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        return restaurantDao.findRestaurantById(id);
    }

    @GetMapping(value = "restaurant/search")
    public List<Restaurant> getRestaurantsByLocation(@RequestParam String location) {
        return restaurantDao.findRestaurantsByLocation(location);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping(value = "outing")
    public Outing createNewOuting(@RequestBody Outing outing, @RequestParam String location, Principal principal) {
        Long userId = userDao.findByUsername(principal.getName()).getId();
        List<Restaurant> locationRestaurants = restaurantDao.findRestaurantsByLocation(location);
        Set<RestaurantRef> outingRestaurants = new HashSet<>();
        outing.setInviterId(userId);
        outing.setId(outingDao.createNewOuting(outing));
        for (Restaurant restaurant : locationRestaurants) {
            RestaurantRef restaurantRef = new RestaurantRef();
            restaurantRef.setOutingId(outing.getId());
            restaurantRef.setRestaurantId(restaurant.getId());
            restaurantRef.setUpvotes((long) 0);
            restaurantRef.setDownvotes((long) 0);
            restaurantRef.setId(outingDao.insertRestaurantRef(restaurantRef));
            outingRestaurants.add(restaurantRef);
        }

        for (GuestRef outingGuest : outing.getOutingGuests()) {
            outingGuest.setOutingId(outing.getId());
            outingGuest.setId(outingDao.insertGuestRef(outingGuest));
        }
        outing.setOutingRestaurants(outingRestaurants);
        return outing;
    }

//    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping(value = "outing/restaurant")
    public Long updateVoteCount(@RequestBody RestaurantRef outingRestaurant, @RequestParam boolean selectedUpvote) {
        return outingDao.updateVoteCount(outingRestaurant.getId(), selectedUpvote);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "outing")
    public List<Outing> getUserOutings(Principal principal) {
        Long userId = userDao.findByUsername(principal.getName()).getId();
        return outingDao.findOutingsByInviterId(userId);
    }

    @PostMapping(value = "tag")
    public Tag addTag(@RequestBody Tag tag) {
        tag.setId(restaurantDao.addTag(tag));
        return tag;
    }

    @GetMapping(value = "tag")
    public List<Tag> getTags() {
        return restaurantDao.getAllTags();
    }

    @GetMapping(value = "tag/{id}")
    public Tag getTagById(@PathVariable Long id) {
        return restaurantDao.getTagById(id);
    }

    @GetMapping(value = "guest")
    public Outing getOutingAsGuest(@RequestParam GuestId id) {
        Long outingId = outingDao.findOutingGuestById(id.getId()).getOutingId();
        return outingDao.findOutingById(outingId);
    }
}
