package com.example.PFA.auth;

import com.example.PFA.role.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  @NotEmpty(message= "Firstname is mandatory")
  @NotBlank(message= "Firstname is mandatory")
  private String firstname;

  @NotEmpty(message= "Lastname is mandatory")
  @NotBlank(message= "Lastname is mandatory")
  private String lastname;

  @Email(message = "Email is not formatted")
  @NotEmpty(message= "Email is mandatory")
  @NotBlank(message= "Email is mandatory")
  private String email;

  @Email(message = "EmailAcad is not formatted")
  private String emailAcad;

  @NotEmpty(message= "Password is mandatory")
  @NotBlank(message= "Password is mandatory")
  @Size(min=8,message="password should be 8 characters long minimum")
  private String password;

  private List<UserRole> roles;
}
