package com.generalsoftware.kangab.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.ColumnDto;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Column;
import com.generalsoftware.kangab.service.ColumnService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/columns")
@AllArgsConstructor
public class ColumnController {

    private ColumnService service;
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<ApiResponseDto<ColumnDto>> create(@RequestBody ColumnDto data) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Create column", modelMapper.map(service
                    .create(data.getBoardId(), modelMapper.map(data, Column.class)), ColumnDto.class)));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
