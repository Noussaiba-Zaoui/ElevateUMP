package com.example.PFA.auth;

import com.example.PFA.role.UserRole;
import com.example.PFA.user.ChangePasswordRequest;
import com.example.PFA.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final UserService userService;

//  @PostMapping("/register")
//  @ResponseStatus(HttpStatus.ACCEPTED)
//  public ResponseEntity<?> register(
//          @RequestBody @Valid RegisterRequest request
//  )  {
//    service.register(request);
//    return ResponseEntity.accepted().build();
//  }

//  @PostMapping("/register")
//  @ResponseStatus(HttpStatus.ACCEPTED)
//  public ResponseEntity<AuthenticationResponse> register(
//          @RequestBody @Valid RegisterRequest request
//  ) throws MessagingException {
//    service.register(request);
//    return ResponseEntity.accepted().build();
//  }








  @PostMapping("/register")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid RegisterRequest request) throws MessagingException {
    AuthenticationResponse response = service.register(request);
    return ResponseEntity.accepted().body(response);
  }


  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
          @RequestBody @Valid AuthenticationRequest request
  )  {

    AuthenticationResponse response = service.authenticate(request);

    return ResponseEntity.accepted().body(response);
  }


  @GetMapping("/getUserRoles")
  public List<UserRole> getUserRoles(@RequestParam String userEmail) {
    return userService.getUserRoles(userEmail);
  }





  @GetMapping("/activate-account")
  public ResponseEntity<String> confirm(@RequestParam String token) throws MessagingException {
    try {
      String response = service.activateAccount(token);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @GetMapping("/resend-code")
  public void resendCode(
          @RequestParam String email
  ) throws MessagingException {

    service.resendCode(email);

  }

  @PostMapping("/refresh-token")
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}