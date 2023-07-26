package com.generalsoftware.kangab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.annotation.CurrentUser;
import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.BoardCreateDto;
import com.generalsoftware.kangab.dto.BoardDto;
import com.generalsoftware.kangab.dto.BoardUpdateDto;
import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Board;
import com.generalsoftware.kangab.service.BoardService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/boards")
@AllArgsConstructor
public class BoardController {

    private final BoardService service;
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<BoardDto>>> findByUser(@CurrentUser String userEmail) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Get all boards from user",
                    service.findByUser(userEmail).stream().map(board -> mapper.map(board, BoardDto.class))
                            .collect(Collectors.toList())));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponseDto<BoardDto>> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Get board by id", mapper.map(service
                    .findById(id), BoardDto.class)));
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
                    mapper.map(service.create(userEmail, mapper.map(board, Board.class)), BoardDto.class)));
        } catch (ResourceAlreadyExistException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/manageUsers")
    public ResponseEntity<ApiResponseDto<BoardDto>> addUser(@PathVariable Long id,
            @RequestBody List<String> usersEmail) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Manage board users",
                    mapper.map(service.manageUsers(id, usersEmail), BoardDto.class)));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<ApiResponseDto<BoardDto>> update(@RequestBody BoardUpdateDto board) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Update board",
                    mapper.map(service.update(mapper.map(board, Board.class)), BoardDto.class)));
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
