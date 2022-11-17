package com.techelevator.dao;

import com.techelevator.model.GuestRef;
import com.techelevator.model.Outing;
import com.techelevator.model.RestaurantRef;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface OutingDao {

    Long createNewOuting(Outing outing);

    Long insertRestaurantRef(RestaurantRef outingRestaurant);

    Long insertGuestRef(GuestRef outingGuest);

    List<Outing> findOutingsByInviterId(Long inviterId);

    Outing findOutingById(Long id);

    List<Outing> findCurrentOutings(Long inviterId, LocalDateTime decision_time);
}
