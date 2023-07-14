package com.generalsoftware.kangab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.annotation.CurrentUser;
import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.UserDto;
import com.generalsoftware.kangab.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<UserDto>>> findAll() {
        return ResponseEntity.ok()
                .body(new ApiResponseDto<>(true, "Get all users", userService.findAllUsers().stream()
                        .map(user -> mapper.map(user, UserDto.class)).collect(Collectors.toList())));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDto<UserDto>> findMe(@CurrentUser String userEmail) {
        return ResponseEntity.ok()
                .body(new ApiResponseDto<>(true, "Current user",
                        mapper.map(userService.findUserByEmail(userEmail), UserDto.class)));
    }
}
