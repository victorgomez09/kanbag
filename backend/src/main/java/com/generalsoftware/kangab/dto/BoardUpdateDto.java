package com.generalsoftware.kangab.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardUpdateDto {

    private Long id;

    private String name;

    private String description;

}