package com.generalsoftware.kangab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalsoftware.kangab.dto.ApiResponseDto;
import com.generalsoftware.kangab.dto.CardDto;
import com.generalsoftware.kangab.dto.UpdateCardOrderAndColumn;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Card;
import com.generalsoftware.kangab.service.CardService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/cards")
@AllArgsConstructor
public class CardController {

    private CardService service;
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<ApiResponseDto<CardDto>> create(@RequestBody CardDto data) {
        try {
            return ResponseEntity.ok().body(new ApiResponseDto<>(true, "Create card", mapper.map(service
                    .create(data.getColumnId(), mapper.map(data, Card.class)), CardDto.class)));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("updateOrder")
    public ResponseEntity<ApiResponseDto<List<CardDto>>> updateOrder(@RequestBody List<CardDto> data) {
        try {
            return ResponseEntity.ok()
                    .body(new ApiResponseDto<>(true, "Update card order",
                            service.updateOrder(data.stream().map(card -> mapper.map(card, Card.class))
                                    .collect(Collectors.toList()))
                                    .stream().map(entity -> mapper.map(entity, CardDto.class))
                                    .collect(Collectors.toList())));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("updateOrderAndColumn")
    public ResponseEntity<ApiResponseDto<List<CardDto>>> updateOrderAndColumn(
            @RequestBody UpdateCardOrderAndColumn data) {
        try {
            return ResponseEntity.ok()
                    .body(new ApiResponseDto<>(true, "Update card order and column",
                            service.updateOrderAndColumn(
                                    data.getPrevColumn().stream().map(card -> mapper.map(card, Card.class))
                                            .collect(Collectors.toList()),
                                    data.getCurrentColumn().stream().map(card -> mapper.map(card, Card.class))
                                            .collect(Collectors.toList()))
                                    .stream().map(entity -> mapper.map(entity, CardDto.class))
                                    .collect(Collectors.toList())));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new ApiResponseDto<>(false, e.getMessage(), null),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
