package com.generalsoftware.kangab.controller;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.converter.UserMapper;
import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.SignInDto;
import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
import com.generalsoftware.kangab.security.LocalUser;
import com.generalsoftware.kangab.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    final UserService userService;
    final JwtEncoder encoder;
    final UserMapper mapper;

    final AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponseDto<String>> authenticateUser(@Valid @RequestBody SignInDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        LocalUser localUser = (LocalUser) authentication.getPrincipal();
        String jwt = getToken(localUser);
        return ResponseEntity.ok(new ApiResponseDto<>(true, "User signed", jwt));
    }

    private String getToken(LocalUser localUser) {
        Instant now = Instant.now();
        long expiry = 36000L;
        String scope = localUser.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(localUser.getUsername())
                .claim("scope", scope)
                .build();

        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDto<Void>> registerUser(@Valid @RequestBody SignUpDto signUpRequest) {
        try {
            userService.registerNewUser(mapper.toEntityFromCreateDto(signUpRequest));
        } catch (ResourceAlreadyExistException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, "Email Address already in use!", null),
                    HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponseDto<>(true, "User registered successfully", null));
    }
}