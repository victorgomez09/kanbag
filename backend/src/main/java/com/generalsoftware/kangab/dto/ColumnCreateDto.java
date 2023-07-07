package com.generalsoftware.kangab.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColumnCreateDto {
    
    private Long boardId;
    private String name;
}
