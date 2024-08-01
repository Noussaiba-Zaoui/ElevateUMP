package com.example.PFA.demo;


import com.example.PFA.Session.NotificationRequest;
import com.example.PFA.Session.Session;
import com.example.PFA.Session.SessionService;
import com.example.PFA.email.EmailService;
import com.example.PFA.project.Project;
import com.example.PFA.project.ProjectService;

import com.example.PFA.auth.AuthenticationService;
import com.example.PFA.user.Role;
import com.example.PFA.user.User;
import com.example.PFA.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")

public class AdminController {


    private final UserService userService;

    private final  SessionService sessionService;
    private final ProjectService projectService;
    @Autowired
    private EmailService emailService;

    private final AuthenticationService authenticationService;

    @Autowired
    public AdminController( UserService userService,SessionService sessionService,ProjectService projectService,AuthenticationService authenticationService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.projectService = projectService;

        this.authenticationService = authenticationService;
    }




    @PostMapping("/sendNotification")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:create')")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
        String message = request.getMessage();
        List<String> roleNames = request.getRoles();
        System.out.println("Message: " + message);
        System.out.println("Roles: " + roleNames);
        try {
            for (String roleName : roleNames) {
                Role role = Role.valueOf(roleName); // Assuming Role is an enum
                List<User> users = userService.getUsersByRole(role);
                for (User user : users) {
                    emailService.sendCustomNotification(user.getEmail(), user.getFirstname(), message);}
            }
            return ResponseEntity.ok("Notification sent successfully to selected roles.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send notification.");
        }
    }



//test this

    @GetMapping("/users/{email}")
   // @PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:read')")
    public Optional<User> user(@PathVariable String email) {

        Optional<User> user = userService.findUserByEmail(email);

        return user;

    }


    @DeleteMapping("/session/{sessionId}")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:delete')")
    public ResponseEntity<Void> deleteSession(@PathVariable Long sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/session")
    //@PreAuthorize("hasAnyRole('ADMIN','COMMISSION','RESPCALENDER') and hasAnyAuthority('admin:read','commission:read','resp_calender:read') ")
    public List<Session> getSessions() {
        return sessionService.getSessions();
    }

    @GetMapping("/session/{date}")
    //@PreAuthorize("hasAnyRole('ADMIN','COMMISSION','RESPCALENDER') and hasAnyAuthority('admin:read','commission:read','resp_calender:read') ")
    public Long getSessionIdByDate(@PathVariable LocalDate date) {

        int sessionStatus = sessionService.getSessionStatusByDate(date);

        if (sessionStatus == 1) {
            return sessionService.getSessionIdByDate(date);
        } else {
            return null;
        }
    }



//    @PostMapping("/add")
//    @PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:create')")
//    public ResponseEntity<User> addUser(@RequestBody User user) {
//        User newUser = userService.addUser(user);
//        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
//    }





    @PostMapping("/addUser")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:create')")
    public void registerNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }






    //this is a normal add only depending on role
    @PostMapping("/addUserWithRoleCommission")
    public ResponseEntity<String> addUserWithRoleCommission(
            @RequestBody User user,
            @RequestParam("email") String email,
            @RequestParam("roleName") Role roleName
    ) { // Ajout du paramètre sessionId
        try {
            String plainTextPassword = user.getPassword();

            // Ajouter l'utilisateur
            userService.addNewUser(user);

            // Ajouter le rôle à l'utilisateur
            userService.addRoleToUser(email, String.valueOf(roleName));

            // Envoyer l'email à l'utilisateur ajouté
            userService.sendInfoMail(user, roleName, plainTextPassword);

            return ResponseEntity.ok("User added successfully with role: " + roleName);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Role not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }



    //this is an add depending on session
    @PostMapping("/addUserWithRole")
   // @PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:create')")
    public ResponseEntity<String> addUserWithRole(
            @RequestBody User user,
            @RequestParam("email") String email,
            @RequestParam("roleName") Role roleName,
            @RequestParam("sessionId") Long sessionId) { // Ajout du paramètre sessionId
        try {
            String plainTextPassword = user.getPassword();

            // Récupérer la session par ID
            Session currentSession = sessionService.getSessionById(sessionId);
            if (currentSession == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid session ID");
            }

            // Associer l'utilisateur à la session récupérée
            user.setSession(currentSession);

            // Ajouter l'utilisateur
            userService.addNewUser(user);

            // Ajouter le rôle à l'utilisateur
            userService.addRoleToUser(email, String.valueOf(roleName));

            // Envoyer l'email à l'utilisateur ajouté
            userService.sendInfoMail(user, roleName, plainTextPassword);

            return ResponseEntity.ok("User added successfully with role: " + roleName);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Role not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

// this endpoint is for commission members they d'ont depend on session


    @GetMapping("/allUsers")
   // @PreAuthorize("hasAnyRole('ADMIN','COMMISSION') and hasAnyAuthority('admin:read', 'commission:read')")
    public List<User> getUsers(){
        // Retrieve all users from the service
        List<User> allUsers = userService.getUsers();

        // Filter out users with the role "ADMIN"
        List<User> nonAdminUsers = allUsers.stream()
                .filter(user -> user.getRoles().stream().noneMatch(role -> role.getRole().equals("ADMIN")))
                .collect(Collectors.toList());

        return nonAdminUsers;

    }

    //this endpoint is for liste of users that depends on sessions

    @GetMapping("/session/{sessionId}/users")
    public List<User> getUsersBySession(@PathVariable Long sessionId) {
        // Get the filtered users of the session
        List<User> sessionUsers = userService.getUsersBySession(sessionId);

        // Define the roles you want to include
        List<Role> roles = List.of(Role.COMMISSION, Role.JURY, Role.PRESIDENTJURY, Role.RESPCALENDER);

        // Use a set to avoid duplicates
        Set<User> commissionMembers = new HashSet<>();

        // Get users for each role and add them to the set
        for (Role role : roles) {
            commissionMembers.addAll(userService.getUsersByRole(role));
        }

        // Filter commission members without a session and exclude "ADMIN", "PARTICIPANT", and "CANDIDATE" roles
        List<User> filteredCommissionMembers = commissionMembers.stream()
                .filter(user -> user.getSession() == null)
                .filter(user -> user.getRoles().stream().noneMatch(role ->
                        role.getRole().equals("ADMIN") ||
                                role.getRole().equals("PARTICIPANT") ||
                                role.getRole().equals("CANDIDATE")))
                .collect(Collectors.toList());

        // Combine the filtered session users and commission members
        sessionUsers.addAll(filteredCommissionMembers);

        return sessionUsers;
}




    @GetMapping("/by-role/{roleName}")
    // @PreAuthorize("hasAnyRole('ADMIN','COMMISSION')and hasAnyAuthority('admin:read', 'commission:read')")
    public List<User> getUsersByRole(@PathVariable Role roleName) {
        return userService.getUsersByRole(roleName);
    }



    @PutMapping("/session/{id}")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:update')")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody Session updatedSessionData) {
        Session updatedSession = sessionService.updateSession(id, updatedSessionData);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
    }

    @DeleteMapping(path= "{userId}")
    // @PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:delete')")
    public void deleteUser(@PathVariable("userId") Integer userId){
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:update')")
    public void updateUser(
            @PathVariable("userId") Integer userId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email)
    {
        userService.updateUser(userId,firstName,lastName,email);
    }

    @PostMapping("/addRole")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:create')")
    public void registerNewURole(@RequestBody Role role){
        userService.addNewRole(role);
    }

    @PostMapping("/addRoleToUser")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:create')")
    public ResponseEntity<String> addRoleToUser(
            @RequestParam("email") String email,
            @RequestParam("roleName") String roleName) {

        try {
            userService.addRoleToUser(email, String.valueOf(Role.valueOf(roleName)));
            return ResponseEntity.ok("Role added successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Role not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @DeleteMapping("/removeRoleFromUser")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:delete')")
    public ResponseEntity<String> removeRoleFromUser(
            @RequestParam("email") String email,
            @RequestParam("roleName") String roleName) {

        try {
            userService.removeRoleFromUser(email, String.valueOf(Role.valueOf(roleName)));
            return ResponseEntity.ok("Role removed ");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Role not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    @GetMapping("/session/{sessionId}/etat/deposed")
   // @PreAuthorize("hasAnyRole('ADMIN','COMMISSION','RESPCALENDER') and hasAnyAuthority('admin:read','commission:read','resp_calender:read')")

    public List<Project> getDeposedProjectsInSession(@PathVariable Long sessionId) {

        Session session = sessionService.getSessionById(sessionId);
        return projectService.getDeposedProjectsInSession(session);
    }


    @GetMapping("/pending-accounts")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:read')")
    public ResponseEntity<List<User>> getPendingAccounts() {
        List<User> pendingUsers = userService.getPendingUsers();
        return ResponseEntity.ok(pendingUsers);
    }


    @RequestMapping(value = "/accept", method = RequestMethod.GET)
    public void acceptUserAccount (@RequestParam("email") String email) throws MessagingException {
        System.out.println(email);
        authenticationService.acceptUser(email);

    }

    @RequestMapping(value = "/reject", method = RequestMethod.GET)
    public void rejectUserAccount (@RequestParam ("email") String email ){
        authenticationService.rejectUser(email);

    }

    @GetMapping("/commission-member/{id}")
    //@PreAuthorize("hasRole('ADMIN') and hasAuthority('admin:read')")
    public ResponseEntity<Optional<User>> getCommissionMemberById(@PathVariable Integer id) {

        Optional<User> user = userService.getCommissionMemberById(id);
        return ResponseEntity.ok(user);

    }

}