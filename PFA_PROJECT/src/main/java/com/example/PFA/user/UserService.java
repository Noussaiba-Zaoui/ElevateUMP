package com.example.PFA.user;

import com.example.PFA.Session.Session;
import com.example.PFA.Session.SessionRepository;
import com.example.PFA.email.EmailService;
import com.example.PFA.role.UserRole;
import com.example.PFA.role.UserRoleRepository;
import com.example.PFA.token.TokenRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final SessionRepository sessionRepository;



    public List<User> getPendingUsers() {

        return userRepository.findByEnabled(false);
    }


    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }



        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);
    }


    public void addNewUser(User user) {
        Optional<User> userOptional= userRepository
                .findByEmail(user.getEmail());
        if(userOptional.isPresent()){
            throw new IllegalStateException("email taken");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void sendInfoMail(User user, Role role, String pass){
        emailService.sendInformationEmailToUser(user.getFirstname(),
                role,
                pass,
                user.getEmail());

    }


    public List<User> getUsers() {
        // Get users with the "ADMIN" role
        List<User> adminUsers = getUsersByRole(Role.valueOf("ADMIN"));
        List<User> participants = getUsersByRole(Role.valueOf("PARTICIPANT"));
        List<User> condidates = getUsersByRole(Role.valueOf("CONDIDAT"));
        List<User> respCals = getUsersByRole(Role.valueOf("RESPCALENDER"));
        List<User> jurys = getUsersByRole(Role.valueOf("JURY"));



        // Get all users from the repository
        List<User> allUsers = userRepository.findAll();

        // Remove admin users from the list of all users
        allUsers.removeAll(adminUsers);
        allUsers.removeAll(participants);
        allUsers.removeAll(condidates);
        allUsers.removeAll(respCals);
        allUsers.removeAll(jurys);

        return  allUsers;
    }



    @Transactional
    public void deleteUser(Integer userId) {
        boolean exists = userRepository.existsById(userId);
        if(!exists) {
            throw new IllegalStateException(
                    "user with id " + userId + " does not exists"
            );
        }
        // First, delete the associated tokens

        tokenRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);


    }

    @Transactional
    public void updateUser(Integer userId, String firstName, String lastName, String email) {
       User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id " + userId + " does not exist"
                ));

        if (firstName != null && !firstName.equals(user.getFirstname())) {
            user.setFirstname(firstName);
        }

        if (lastName != null && !lastName.equals(user.getLastname())) {
            user.setLastname(lastName);
        }

        if (email != null && !email.equals(user.getEmail())) {
            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isPresent()) {
                throw new IllegalStateException("email already taken");
            }

            user.setEmail(email);
        }
    }



    public boolean verifyCurrentPassword(String email, String currentPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(currentPassword, user.getPassword());
        } else {
            return false;
        }
    }

    public void updatePassword(String email, String newPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }
    }


    public void addNewRole(Role role) {
        //todo role is duplicated in teh database
        // Check if the role already exists
        Optional<UserRole> existingUserRole = userRoleRepository.findByRole(role);
        if (existingUserRole.isPresent()) {
            // Role already exists, handle accordingly (maybe throw an exception or log a message)
            // For now, let's just return
            return;
        }

        // Create a new UserRole entity with the specified role
        UserRole newUserRole = new UserRole();
        newUserRole.setRole(role);

        // Save the UserRole entity to the database
        userRoleRepository.save(newUserRole);
    }



    public Optional<UserRole> findRoleByRoleName(Role roleName) {
        return userRoleRepository.findByRole(roleName);
    }


    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }



    public void addRoleToUser(String email, String roleName) {

        Optional<User> userOptional = findUserByEmail(email);
        Optional<UserRole> roleOptional = findRoleByRoleName(Role.valueOf(roleName));

        // Check if both user and role are present
        if (userOptional.isPresent() && roleOptional.isPresent()) {
            User user = userOptional.get();
            UserRole role = roleOptional.get();

            // Add role to user
            user.getRoles().add(role);

            // Add user to role (assuming you have a method like `addUser` in your `Role` class)
            //role.getUsers().add(user);

            // Save the updated entities
            userRepository.save(user);
            userRoleRepository.save(role);


        } else {
            // Throw an exception if either user or role is not found
            throw new EntityNotFoundException("User or Role not found");
        }

    }

    public List<User> getUsersByRole(Role roleName) {
        Optional<UserRole> userRoleOptional = userRoleRepository.findByRole(roleName);
        List<User> usersByRole = new ArrayList<>();

        if (userRoleOptional.isPresent()) {
            UserRole userRole = userRoleOptional.get();
            List<User> users = userRole.getUsers();
            usersByRole.addAll(users);
        }

        return usersByRole;
    }



    public List<UserRole> getUserRoles(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<UserRole> roles = user.getRoles();
            if (roles != null) {
                return roles;
            } else {
                // If the user has no roles, return an empty list
                return Collections.emptyList();
            }
        } else {
            // If the user doesn't exist, return an empty list
            return Collections.emptyList();
        }
    }




    public Optional<User> getCommissionMemberById(Integer userId)  {
        return userRepository.findById(userId);

    }


    @Transactional
    public void removeRoleFromUser(String email, String roleName) {

        Optional<User> userOptional = findUserByEmail(email);
        Optional<UserRole> roleOptional = findRoleByRoleName(Role.valueOf(roleName));

        // Check if both user and role are present
        if (userOptional.isPresent() && roleOptional.isPresent()) {
            User user = userOptional.get();
            UserRole role = roleOptional.get();

            // Add role to user
            user.getRoles().remove(role);

            // Add user to role (assuming you have a method like `addUser` in your `Role` class)
            //role.getUsers().add(user);

            // Save the updated entities
            userRepository.save(user);



        } else {
            // Throw an exception if either user or role is not found
            throw new EntityNotFoundException("User or Role not found");
        }

    }



    public User addUser(User user) {
        return userRepository.save(user);

    }

    public List<User> getUsersBySession(Long sessionId) {
        // Get all users from the repository
        List<User> allUsers = userRepository.findAll();
        List<User> adminUsers = getUsersByRole(Role.valueOf("ADMIN"));
        List<User> participants = getUsersByRole(Role.valueOf("PARTICIPANT"));
        List<User> candidates = getUsersByRole(Role.valueOf("CONDIDAT"));







        // Remove admin,participants and candidates users from the list of all users
        allUsers.removeAll(adminUsers);
        allUsers.removeAll(participants);
        allUsers.removeAll(candidates);

        // Filter users by session ID and exclude those with "ADMIN", "PARTICIPANT", and "CANDIDATE" roles
        return allUsers.stream()
                .filter(user -> user.getSession() != null && user.getSession().getId_session().equals(sessionId))
                .filter(user -> user.getRoles().stream().noneMatch(role ->
                        role.getRole().equals("ADMIN") ||
                                role.getRole().equals("PARTICIPANT") ||
                                role.getRole().equals("CONDIDAT")
                ))
                .collect(Collectors.toList());
}




    }




