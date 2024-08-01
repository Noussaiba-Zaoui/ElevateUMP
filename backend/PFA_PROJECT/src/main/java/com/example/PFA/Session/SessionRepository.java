package com.example.PFA.Session;

import com.example.PFA.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session,Long> {
    @Override
    Optional<Session> findById(Long Id);

    @Query("SELECT s FROM Session s WHERE :currentDate BETWEEN s.dateDebut AND s.dateFin")
    Session findCurrentSession(@Param("currentDate") LocalDate currentDate);




}
