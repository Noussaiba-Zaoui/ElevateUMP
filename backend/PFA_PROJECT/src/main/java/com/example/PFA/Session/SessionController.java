package com.example.PFA.Session;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/session")
public class SessionController {
    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    //@PreAuthorize("hasAnyRole('ADMIN') and hasAnyAuthority('admin:create')")
    public ResponseEntity<?> createSession(@RequestBody Session session) {
        try {
            Session savedSession = sessionService.saveSession(session);
            return new ResponseEntity<>(savedSession, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("Une session courante existe déjà.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la création de la session", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //recuperer ma session active pour le colorer en vert
    @GetMapping("/current")
    public ResponseEntity<Long> getCurrentSessionId() {
        Long currentSessionId = sessionService.getCurrentSessionId();
        return new ResponseEntity<>(currentSessionId, HttpStatus.OK);

    }




    @PutMapping("/{id}")
    public ResponseEntity<?> updateSession(@PathVariable Long id, @RequestBody Session updatedSessionData) {
        try {
            Session updatedSession = sessionService.updateSession(id, updatedSessionData);
            return new ResponseEntity<>(updatedSession, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Session not found with ID: " + id, HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("Une session courante existe déjà.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour de la session", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{sessionId}")
    @Transactional
    // @PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:delete')")
    public ResponseEntity<Void> deleteSession(@PathVariable Long sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    //@PreAuthorize("hasAnyRole('ADMIN','COMMISSION','RESPCALENDER') and hasAnyAuthority('admin:read','commission:read','resp_calender:read')")
    public List<Session> getSessions() {
        return sessionService.getSessions();
    }





    @GetMapping("/{date}")
    // @PreAuthorize("hasAnyRole('ADMIN','COMMISSION','RESPCALENDER') and hasAnyAuthority('admin:read','commission:read','resp_calender:read')")
    public Long getSessionIdByDate(@PathVariable LocalDate date) {
        int sessionStatus = sessionService.getSessionStatusByDate(date);
        if (sessionStatus == 1) {
            return sessionService.getSessionIdByDate(date);
        } else {
            return null;
        }
    }

    @GetMapping("/status")
    public int getSessionStatus() {
        LocalDate currentDate = LocalDate.now();
        return sessionService.getSessionStatusByDate(currentDate);
    }

    @GetMapping("/currentEndDate")
    public ResponseEntity<LocalDate> getCurrentSessionEndDate() {
        LocalDate currentDate = LocalDate.now();
        LocalDate endDate = sessionService.getCurrentSessionEndDate(currentDate);
        return new ResponseEntity<>(endDate, HttpStatus.OK);
    }


}