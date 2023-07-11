package com.generalsoftware.kangab.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDto {

    private Long id;

    private String name;

    private String description;

    private UserDto owner;

    private List<UserDto> members;

    private List<ColumnDto> columns;

    private Date creationDate;

    private Date modificationDate;
}
