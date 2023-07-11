package com.generalsoftware.kangab.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColumnDto {

    private Long id;

    private String name;

    private int order;

    private List<CardDto> cards;

    private Long boardId;
}
