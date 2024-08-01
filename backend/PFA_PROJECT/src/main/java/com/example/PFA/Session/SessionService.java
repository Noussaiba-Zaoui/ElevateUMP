package com.example.PFA.Session;

import com.example.PFA.email.EmailService;
import com.example.PFA.project.Project;
import com.example.PFA.project.ProjectRepository;
import com.example.PFA.role.UserRole;
import com.example.PFA.token.TokenRepository;
import com.example.PFA.user.Role;
import com.example.PFA.user.User;
import com.example.PFA.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    private final ProjectRepository projectRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository, UserRepository userRepository, EmailService emailService, ProjectRepository projectRepository, TokenRepository tokenRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.projectRepository = projectRepository;
        this.tokenRepository = tokenRepository;
    }

    public List<Session> getSessions() {
        return sessionRepository.findAll();
    }

    public void deleteSession(Long sessionId) {

        // Delete associated projects
        List<Project> projects = projectRepository.findBySessionId(sessionId);
        projectRepository.deleteAll(projects);

        // Delete associated users
        List<User> users = userRepository.findBySessionId(sessionId);

        // Delete tokens associated with each user
        for (User user : users) {
            tokenRepository.deleteByUserId(user.getId());
        }
        userRepository.deleteAll(users);
        sessionRepository.deleteById(sessionId);
    }

    public int getSessionStatusByDate(LocalDate date) {
        List<Session> sessions = sessionRepository.findAll();
        for (Session session : sessions) {
            LocalDate sessionStartDate = session.getDateDebut();
            LocalDate sessionEndDate = session.getDateFin();
            if (date.isAfter(sessionStartDate) && date.isBefore(sessionEndDate)) {
                return 1; // Session ouverte
            }
        }
        return 0; // Aucune session ouverte pour la date donnée
    }

    public Long getSessionIdByDate(LocalDate date) {
        List<Session> sessions = sessionRepository.findAll();
        for (Session session : sessions) {
            LocalDate sessionStartDate = session.getDateDebut();
            LocalDate sessionEndDate = session.getDateFin();
            if (date.isAfter(sessionStartDate) && date.isBefore(sessionEndDate)) {
                return session.getId_session(); // Retourne l'id_session si la session est ouverte
            }
        }
        return null; // Aucune session ouverte pour la date donnée
    }

    public Session getSessionById(Long sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found with id: " + sessionId));
    }

    public Session getCurrentSession(){
        LocalDate currentDate = LocalDate.now();
        Long Id = getSessionIdByDate(currentDate);
        Session MySession = getSessionById(Id);
        return MySession;
    }


    //verifier si cette session entré est courant ou non
    public boolean existsCurrentSession() {
        LocalDate currentDate = LocalDate.now();
        return sessionRepository.findAll().stream().anyMatch(session ->
                currentDate.isAfter(session.getDateDebut()) && currentDate.isBefore(session.getDateFin())
        );
    }
    //verifier dans tout les sessions stocké est ce qu'il existe une session courante
    private boolean isCurrentSession(Session session) {
        LocalDate currentDate = LocalDate.now();
        return currentDate.isAfter(session.getDateDebut()) && currentDate.isBefore(session.getDateFin());
    }

    public Session saveSession(Session session) {
        if (session.getDateFin().isBefore(session.getDateDebut())) {
            throw new IllegalArgumentException("La date de fin doit être ultérieure à la date de début.");
        }

        // Vérifier si une session courante existe déjà
        if (existsCurrentSession() && isCurrentSession(session)) {
            throw new IllegalStateException("Une session courante existe déjà.");
        }

        try {
            Session savedSession = sessionRepository.save(session);
            notifyUsersForNewSession(savedSession);
            return savedSession;
        } catch (Exception e) {
            System.err.println("Failed to save session: " + e.getMessage());
            throw e;
        }
    }

    //recupzrer ma session courante
    public Long getCurrentSessionId() {
        LocalDate currentDate = LocalDate.now();
        return getSessionIdByDate(currentDate);
    }


    public Session updateSession(Long id, Session updatedSessionData) {
        // Validate update request
        if (id == null) {
            throw new IllegalArgumentException("Session ID cannot be null");
        }

        // Vérifiez si la date de fin est ultérieure à la date de début
        if (updatedSessionData.getDateFin().isBefore(updatedSessionData.getDateDebut())) {
            throw new IllegalArgumentException("La date de fin doit être ultérieure à la date de début.");
        }

        // Retrieve existing Session
        Session existingSession = sessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Session not found with ID: " + id));

        // Vérifiez si la nouvelle session modifiée devient une session courante
        if (isCurrentSession(updatedSessionData) && existsCurrentSession() && !isSameSession(existingSession, updatedSessionData)) {
            throw new IllegalStateException("Une session courante existe déjà.");
        }

        // Update relevant fields (assuming updatedSessionData has all properties)
        existingSession.setDateDebut(updatedSessionData.getDateDebut());
        existingSession.setDateFin(updatedSessionData.getDateFin());
        // ... Update other Session properties as needed

        // Persist the updated session
        Session updatedSession = sessionRepository.save(existingSession);

        // Notify users if the updated session is the current session
        notifyUsersForNewSession(updatedSession);

        return updatedSession;
    }

    //to check if the session is the same session
    private boolean isSameSession(Session existingSession, Session updatedSessionData) {
        return existingSession.getId_session().equals(updatedSessionData.getId_session());
    }

    private void notifyUsersForNewSession(Session session) {
        // Check if the session is the current session
        LocalDate sessionStartDate = session.getDateDebut();
        LocalDate sessionEndDate = session.getDateFin();
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isAfter(sessionStartDate) && currentDate.isBefore(sessionEndDate)) {
            // If the session is the current session, send the email
            List<User> users = userRepository.findAll();
            for (User user : users) {
                for (UserRole role : user.getRoles()) {
                    if (role.getRole() == Role.CONDIDAT || role.getRole() == Role.PARTICIPANT) {
                        try {
                            emailService.sendSessionEmail(user.getEmail(), user.getFullName());
                        } catch (Exception e) {
                            System.err.println("Failed to send email to " + user.getEmail() + ": " + e.getMessage());
                            // Handle the specific error
                        }
                    }
                }
            }
        }

    }


    public LocalDate getCurrentSessionEndDate(LocalDate currentDate) {
        Session currentSession = sessionRepository.findCurrentSession(currentDate);
        return currentSession != null ? currentSession.getDateFin() : null;
    }

}