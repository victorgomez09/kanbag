package com.generalsoftware.kangab.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.annotation.CurrentUser;
import com.generalsoftware.kangab.converter.UserMapper;
import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.UserDto;
import com.generalsoftware.kangab.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private UserMapper mapper;

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDto<UserDto>> findMe(@CurrentUser String userEmail) {
        return ResponseEntity.ok()
                .body(new ApiResponseDto<>(true, "Current user",
                        mapper.toDto(userService.findUserByEmail(userEmail))));
    }
}
