package com.example.PFA.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChangePasswordRequest {

    @NotBlank(message = "Current password is mandatory")
    private String currentPassword;

    @NotBlank(message = "New password is mandatory")
    @Size(min = 8, message = "New password should be 8 characters long minimum")
    private String newPassword;

    @NotBlank(message = "Confirmation password is mandatory")
    private String confirmationPassword;
}
