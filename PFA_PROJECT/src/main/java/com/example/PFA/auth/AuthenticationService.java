package com.example.PFA.auth;

import com.example.PFA.config.JwtService;
import com.example.PFA.email.EmailService;
import com.example.PFA.email.EmailTemplateName;
import com.example.PFA.role.UserRole;
import com.example.PFA.role.UserRoleRepository;
import com.example.PFA.token.Token;
import com.example.PFA.token.TokenRepository;
import com.example.PFA.token.TokenType;
import com.example.PFA.user.Role;
import com.example.PFA.user.User;
import com.example.PFA.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;



@Service
@RequiredArgsConstructor
public class AuthenticationService {


  //  @Value("${application.mailing.frontend.activation-url}")
//  private String activationUrl;
  @Value("${application.security.jwt.expiration}")
  private long jwtExpiration;

  private final UserRepository repository;

  private final UserRoleRepository userRoleRepository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final EmailService emailService;
  private final JavaMailSender mailSender;
  private final SpringTemplateEngine templateEngine;

  public AuthenticationResponse register(RegisterRequest request) throws MessagingException {
  // Retrieve the existing PARTICIPANT role from the database
    Optional<UserRole> participantRoleOptional = userRoleRepository.findByRole(Role.PARTICIPANT);
    UserRole participantRole;
    if (participantRoleOptional.isPresent()) {
      // Get the existing PARTICIPANT role
      participantRole = participantRoleOptional.get();
    } else {
      // If PARTICIPANT role doesn't exist, create it
      participantRole = new UserRole(Role.PARTICIPANT);
      userRoleRepository.save(participantRole); // Save the new PARTICIPANT role to the database
    }

// Add the existing or newly created PARTICIPANT role to the list of roles for the new user
    List<UserRole> roles = new ArrayList<>();
    roles.add(participantRole);


    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .EmailAcad(request.getEmailAcad())
            .status("Pending")
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(roles)
            .build();
    var savedUser = repository.save(user);
    var jwtToken = jwtService.generateToken(user);

    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);


    //sendValidationEmail(user);
    // Retrieve the admin UserRole entity from the database based on the admin role
    Optional<UserRole> adminRoleOptional = userRoleRepository.findByRole(Role.ADMIN);
    if (adminRoleOptional.isPresent()) {
      UserRole adminRole = adminRoleOptional.get();
      // Retrieve the users associated with the admin role
      List<User> adminUsers = adminRole.getUsers();
      // Send the email notification to each admin user
      for (User adminUser : adminUsers) {
        emailService.sendNotificationEmailToAdmin(adminUser,user);
      }
    } else {
      // Handle case where admin role is not found
      throw new IllegalStateException("Admin role not found");
    }


    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }


  private void sendValidationEmail(User user) throws MessagingException {

    var newToken = generateAndSaveActivationToken(user);
    //send Email

    emailService.sendEmail(
            user.getEmail(),
            user.fullName(),
            EmailTemplateName.ACTIVATE_ACCOUNT,
            newToken,
            "Account activation"
    );

  }

  private String generateAndSaveActivationToken(User user) {
    //generate Token
    String generatedToken = generateActivationCode(6);
    var token = Token.builder()
            .token(generatedToken)
            .createdAt(LocalDateTime.now())
            .expiresAt(LocalDateTime.now().plusMinutes(15))
            .user(user)
            .build();
    tokenRepository.save(token);
    return generatedToken;
  }

  private String generateActivationCode(int length) {
    String characters = "0123456789";
    StringBuilder codeBuilder = new StringBuilder();
    SecureRandom secureRandom = new SecureRandom();
    for (int i = 0; i < length; i++) {
      int randomIndex = secureRandom.nextInt(characters.length());
      codeBuilder.append(characters.charAt(randomIndex));

    }
    return codeBuilder.toString();


  }


  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }


  public String activateAccount(String token) throws MessagingException {
    Token savedToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Le code d'activation est incorrect. Veuillez réessayer."));
    System.out.println(token);


    if(savedToken.getExpiresAt() != null && LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
      throw new RuntimeException("Votre token a expiré. Veuillez renvoyer un nouveau code.");

    }


    // Retrieve the user associated with the token
    var user = repository.findById(savedToken.getUser().getId())
            .orElseThrow(()-> new UsernameNotFoundException("User not found"));

    // Enable the user and save changes
    user.setEnabled(true);
    repository.save(user);


    savedToken.setValidateAt(LocalDateTime.now());
    tokenRepository.save(savedToken);

    emailService.sendActivationSuccess(user);

    return "Account activated successfully";

  }




  private void saveUserToken(User user, String jwtToken) {

    // Convert jwtExpiration from milliseconds to a Duration
    Duration expirationDuration = Duration.ofMillis(jwtExpiration);

    // Calculate the expiration date by adding the expiration duration to the current time
    LocalDateTime expiresAt = LocalDateTime.now().plus(expirationDuration);
    var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .createdAt(LocalDateTime.now())
            .expiresAt(expiresAt)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }


  @Transactional
  public void rejectUser(String email) {


    Optional<User> userOptional = repository.findByEmail(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      String name = user.getFullName(); // Assuming you have a method to get the user's full name
      String userEmail = user.getEmail();

      emailService.sendRefuseEmail(name, userEmail);
      user.setStatus("Refused");
      tokenRepository.deleteByUserId(user.getId());

      repository.delete(user);

    }

    else {
      // Handle case where user is not found
      throw new IllegalArgumentException("User not found for the given email: " + email);
    }
  }


  @Transactional
  public void acceptUser(String email) throws MessagingException {

    Optional<User> userOptional = repository.findByEmail(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      String name = user.getFullName(); // Assuming you have a method to get the user's full name
      String userEmail = user.getEmail();
      user.setStatus("Accepted");



//      sendConfirmationEmail(name, userEmail);
      sendValidationEmail(user);
    } else {
      // Handle case where user is not found
      throw new IllegalArgumentException("User not found for the given email: " + email);
    }

  }


//  private void sendConfirmationEmail(String name, String to) {
//
//    try {
//
//      MimeMessage mimeMessage = mailSender.createMimeMessage();
//
//
//      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//
//
//      helper.setTo(to);
//      helper.setSubject("Registration Confirmation");
//
//      Context context = new Context();
//      context.setVariable("name", name);
//      Optional<User> userOptional = repository.findByEmail(to);
//      if(userOptional.isPresent()) {
//        User user = userOptional.get();
//        String token = generateAndSaveActivationToken(user);
//
//
////        System.out.println(code);
////
////        String activateUrl = "http://localhost:3000/activateAccount?token=" + code;
////        System.out.println(activateUrl);
////        context.setVariable("activateURL", activateUrl);
//        context.setVariable("confirmationURL", "http://localhost:3000/activate-account?token=" + token);
//
//        String htmlContent = templateEngine.process("emailConfirmationTemplate", context);
//        helper.setText(htmlContent, true);
//        mailSender.send(mimeMessage);
//      }
//
//    } catch (Exception e) {
//      System.out.println("message : " + e.getMessage());
//      System.out.println("cause : " + e.getCause());
//    }
//  }

//  public void resendCode(String email) throws  MessagingException{
//
//    User user = repository.findByEmail(email)
//            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//    String newToken = generateAndSaveActivationToken(user);
////    sendConfirmationEmail(email, newToken);
//     resendVerificationCode(user);
//  }

  public void resendCode(String email) throws  MessagingException{

    Optional<User> userOptional = repository.findByEmail(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      resendVerificationCode(user);
    }
    else {
      throw new MessagingException("user not found");
    }








    //String newToken = generateAndSaveActivationToken(user);


  }








  public void resendVerificationCode(User user) throws  MessagingException{


    var newToken = generateAndSaveActivationToken(user);
    //send Email

    emailService.resendEmail(
            user.getEmail(),
            user.fullName(),
            newToken

    );

  }


}
