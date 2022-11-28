package com.techelevator.dao;

import com.techelevator.model.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class JdbcOutingDao implements OutingDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcOutingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Long createNewOuting(Outing outing) {
        String insertOuting = "INSERT INTO outing (inviter_id, date_time, decision_time) VALUES(?, ?, ?) RETURNING id";
        Long id = jdbcTemplate.queryForObject(insertOuting, Long.class, outing.getInviterId(), outing.getDateTime(),
                outing.getDecisionTime());
        return id;
    }

    @Override
    public GuestId insertGuestRef(GuestRef outingGuest) {
        String insertGuestRef = "INSERT INTO outing_guest (id, outing_id, guest_email) VALUES(?, ?, ?)";
        UUID uuid = UUID.randomUUID();
        GuestId id = new GuestId(uuid);
        outingGuest.setId(id);
        int rowsCreated = jdbcTemplate.update(insertGuestRef, outingGuest.getId().getId(), outingGuest.getOutingId(), outingGuest.getGuestEmail());
        if (rowsCreated == 1) {
            outingGuest.setId(id);
            return outingGuest.getId();
        }
        return null;
//        for (GuestRef guestRef : outingGuests) {
//            jdbcTemplate.update(insertGuestRefs, guestRef.getOutingId(), guestRef.getGuestEmail());
//        }
    }

    @Override
    public Long insertRestaurantRef(RestaurantRef outingRestaurant) {
        String insertRestaurantRef = "INSERT INTO outing_restaurant (outing_id, restaurant_id, upvotes, downvotes) VALUES(?, ?, ?, ?) RETURNING id";
        return jdbcTemplate.queryForObject(insertRestaurantRef, Long.class, outingRestaurant.getOutingId(),
                outingRestaurant.getRestaurantId(), outingRestaurant.getUpvotes(), outingRestaurant.getDownvotes());
//        for (RestaurantRef resRef : outingRestaurants) {
//            jdbcTemplate.update(insertRestaurantRefs, resRef.getOutingId(), resRef.getRestaurantId());
//        }
    }

    @Override
    public List<Outing> findOutingsByInviterId(Long inviterId) {
        String sql = "SELECT * FROM outing WHERE inviter_id=?";
        List<Outing> outings = new ArrayList<>();
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, inviterId);
        while (results.next()) {
            Outing outing = mapRowToOuting(results);
            outings.add(outing);
        }
        return outings;
    }
    @Override
    public Outing findOutingById(Long id) {
        String sql = "SELECT * FROM outing WHERE id=?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        if (results.next()) {
            return mapRowToOuting(results);
        } else {
            throw new RuntimeException("Outing Id: " + id + " not found.");
        }
    }

    @Override
    public Long updateVoteCount(Long outingRestaurantId, boolean selectedUpvote) {
        String target = selectedUpvote ? "upvotes" : "downvotes";
        String updateCount = String.format("UPDATE outing_restaurant SET %s = %s + 1" +
                " WHERE id = ? RETURNING %s", target, target, target);
        return jdbcTemplate.queryForObject(updateCount, Long.class, outingRestaurantId);
    }

    public GuestRef findOutingGuestById(UUID guestId) {
        String sql = "SELECT * FROM outing_guest WHERE id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, guestId);
        if (results.next()) {
            return mapRowToGuestRef(results);
        }
        return null;
    }

    private Set<RestaurantRef> findOutingRestaurants(Long outingId) {
        Set<RestaurantRef> resRefs = new HashSet<>();
        String sql = "SELECT * FROM outing_restaurant WHERE outing_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, outingId);
        while (results.next()) {
            resRefs.add(mapRowToRestaurantRef(results));
        }
        return resRefs;
    }

    private Set<GuestRef> findOutingGuests(Long outingId) {
        Set<GuestRef> guestRefs = new HashSet<>();
        String sql = "SELECT * FROM outing_guest WHERE outing_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, outingId);
        while (results.next()) {
            guestRefs.add(mapRowToGuestRef(results));
        }
        return guestRefs;
    }

    private Outing mapRowToOuting(SqlRowSet results) {
        Outing outing = new Outing();
        outing.setId(results.getLong("id"));
        outing.setInviterId(results.getLong("inviter_id"));
        Timestamp dateTime = results.getTimestamp("date_time");
        Timestamp decisionTime = results.getTimestamp("decision_time");
        if (dateTime != null) {
            outing.setDateTime(dateTime.toLocalDateTime());
        }
        if (decisionTime != null) {
            outing.setDecisionTime(decisionTime.toLocalDateTime());
        }
        outing.setOutingRestaurants(findOutingRestaurants(outing.getId()));
        outing.setOutingGuests(findOutingGuests(outing.getId()));
        return outing;
    }

    private RestaurantRef mapRowToRestaurantRef(SqlRowSet results) {
        RestaurantRef restaurantRef = new RestaurantRef();
        restaurantRef.setId(results.getLong("id"));
        restaurantRef.setRestaurantId(results.getLong("restaurant_id"));
        restaurantRef.setOutingId(results.getLong("outing_id"));
        restaurantRef.setUpvotes(results.getLong("upvotes"));
        restaurantRef.setDownvotes(results.getLong("downvotes"));
        return restaurantRef;
    }

    private GuestRef mapRowToGuestRef(SqlRowSet results) {
        GuestRef guestRef = new GuestRef();
        guestRef.setId(GuestId.fromString(results.getString("id")));
        guestRef.setOutingId(results.getLong("outing_id"));
        guestRef.setGuestEmail(results.getString("guest_email"));
        return guestRef;
    }
}
