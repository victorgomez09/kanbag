package com.generalsoftware.kangab.dto;

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

}
