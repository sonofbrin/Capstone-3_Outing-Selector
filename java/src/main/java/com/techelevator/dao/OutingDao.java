package com.techelevator.dao;

import com.techelevator.model.Outing;

import java.time.LocalDateTime;
import java.util.List;

public interface OutingDao {

    Long createNewOuting(Outing outing);

    List<Outing> findOutingsByInviterId(Long inviterId);

    Outing findOutingById(Long id);

    List<Outing> findCurrentOutings(Long inviterId, LocalDateTime decision_time);
}
