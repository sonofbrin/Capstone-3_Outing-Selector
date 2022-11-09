package com.techelevator.dao;

import com.techelevator.model.Outing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public List<Outing> findCurrentOutings(Long inviterId, LocalDateTime currentLocalTime) {
        return null;
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
        return outing;
    }
}