package com.generalsoftware.kangab.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    
    private Long id;

    private String name;

    private String description;

    private UserDto owner;

    private List<UserDto> members;

    private Date creationDate;

    private Date modificationDate;
}
