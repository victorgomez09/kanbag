package com.generalsoftware.kangab.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.converter.ColumnMapper;
import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.ColumnCreateDto;
import com.generalsoftware.kangab.dto.ColumnDto;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.service.ColumnService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/columns")
@AllArgsConstructor
public class ColumnController {

    private ColumnMapper mapper;
    private ColumnService service;

    @PostMapping
    public ResponseEntity<ApiResponseDto<ColumnDto>> create(@RequestBody ColumnCreateDto data) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Create column", mapper.toDto(service
                    .create(data.getBoardId(), mapper.toEntity(data.getName())))));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
