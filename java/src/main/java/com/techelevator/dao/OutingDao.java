package com.techelevator.dao;

import com.techelevator.model.GuestId;
import com.techelevator.model.GuestRef;
import com.techelevator.model.Outing;
import com.techelevator.model.RestaurantRef;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface OutingDao {

    Long createNewOuting(Outing outing);

    Long insertRestaurantRef(RestaurantRef outingRestaurant);

    GuestId insertGuestRef(GuestRef outingGuest);

    List<Outing> findOutingsByInviterId(Long inviterId);

    Outing findOutingById(Long id);

    GuestRef findOutingGuestById(UUID id);

    Long updateVoteCount(Long outingRestaurantId, boolean selectedUpvote);


}
