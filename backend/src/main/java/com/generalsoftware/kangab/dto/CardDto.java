package com.generalsoftware.kangab.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDto {

    private Long id;

    private String title;

    private String description;

    private int order;

    private Long columnId;

    private String priority;
}
