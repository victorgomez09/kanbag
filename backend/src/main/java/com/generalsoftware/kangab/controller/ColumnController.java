package com.generalsoftware.kangab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<ApiResponseDto<ColumnDto>> create(@RequestBody ColumnDto data) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Create column", mapper.map(service
                    .create(data.getBoardId(), mapper.map(data, Column.class)), ColumnDto.class)));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<ColumnDto>> update(@PathVariable Long id, @RequestBody ColumnDto data) {
        try {
            return ResponseEntity.ok()
                    .body(new ApiResponseDto<>(true, "Update column",
                            mapper.map(service.update(id, mapper.map(data, Column.class)), ColumnDto.class)));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("updateOrder")
    public ResponseEntity<ApiResponseDto<List<ColumnDto>>> updateOrder(@RequestBody List<ColumnDto> data) {
        try {
            return ResponseEntity.ok()
                    .body(new ApiResponseDto<>(true, "Update column order",
                            service.updateOrder(data.stream().map(column -> mapper.map(column, Column.class))
                                    .collect(Collectors.toList()))
                                    .stream().map(entity -> mapper.map(entity, ColumnDto.class))
                                    .collect(Collectors.toList())));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<Void>> delete(@PathVariable Long id) {
        try {
            service.delete(id);

            return ResponseEntity.ok()
                    .body(new ApiResponseDto<>(true, "Delete column", null));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
