package com.generalsoftware.kangab.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String email;

    private String displayName;

    private boolean enabled;

    private boolean using2FA;

    @JsonIgnore
    private List<BoardDto> boards;
}
