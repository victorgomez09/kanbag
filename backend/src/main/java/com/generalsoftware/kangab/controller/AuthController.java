package com.generalsoftware.kangab.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.SignInDto;
import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
import com.generalsoftware.kangab.model.User;
import com.generalsoftware.kangab.service.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final ModelMapper mapper;
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponseDto<String>> authenticateUser(@Valid @RequestBody SignInDto loginRequest) {
        try {
            return ResponseEntity
                    .ok(new ApiResponseDto<>(true, "User signed",
                            authService.signin(mapper.map(loginRequest, User.class))));
        } catch (ResourceAlreadyExistException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<Void>> registerUser(@Valid @RequestBody SignUpDto signUpRequest) {
        try {
            authService.signup(mapper.map(signUpRequest, User.class));

            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "User registered successfully", null));
        } catch (ResourceAlreadyExistException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, "Email Address already in use!", null),
                    HttpStatus.BAD_REQUEST);
        }
    }

}