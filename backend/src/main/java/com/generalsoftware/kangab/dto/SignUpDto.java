package com.generalsoftware.kangab.dto;

import com.generalsoftware.kangab.util.PasswordMatcher;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@PasswordMatcher
public class SignUpDto {

    @NotEmpty
    private String displayName;

    @NotEmpty
    private String email;

    @Size(min = 6, message = "Minimum 6 chars required")
    private String password;

    @NotEmpty
    private String matchingPassword;

    private boolean using2FA;

    public SignUpDto(String displayName, String email, String password, String matchingPassword) {
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.matchingPassword = matchingPassword;
    }
}