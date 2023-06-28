package com.generalsoftware.kangab.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}