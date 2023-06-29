package com.generalsoftware.kangab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.annotation.CurrentUser;
import com.generalsoftware.kangab.converter.BoardMapper;
import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.BoardCreateDto;
import com.generalsoftware.kangab.dto.BoardDto;
import com.generalsoftware.kangab.dto.BoardUpdateDto;
import com.generalsoftware.kangab.dto.BoardUpdateUsersDto;
import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.service.BoardService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/boards")
@AllArgsConstructor
public class BoardController {

    private final BoardService service;
    private final BoardMapper mapper;

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<BoardDto>>> findByUser(@CurrentUser String userEmail) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Get all boards from user", service
                    .findByUser(userEmail).stream().map(board -> mapper.toDto(board))
                    .collect(Collectors.toList())));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<BoardDto>> create(@CurrentUser String userEmail,
            @RequestBody BoardCreateDto board) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Create board",
                    mapper.toDto(service.create(userEmail, mapper.toEntityFromCreateDto(board)))));
        } catch (ResourceAlreadyExistException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}/addUser")
    public ResponseEntity<ApiResponseDto<BoardDto>> addUser(@PathVariable Long id,
            @RequestBody BoardUpdateUsersDto users) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Added users to board",
                    mapper.toDto(service.addUsers(id, users))));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}/removeUser")
    public ResponseEntity<ApiResponseDto<BoardDto>> removeUser(@PathVariable Long id,
            @RequestBody BoardUpdateUsersDto users) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Remove users from board",
                    mapper.toDto(service.removeUsers(id, users))));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<ApiResponseDto<BoardDto>> update(@RequestBody BoardUpdateDto board) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Update board",
                    mapper.toDto(service.update(mapper.toEntityFromUpdateDto(board)))));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<Void>> update(@PathVariable Long id) {
        try {
            service.delete(id);

            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Delete board", null));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
