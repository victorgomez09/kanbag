package com.generalsoftware.kangab.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private Long id;

    private String email;

    private String displayName;

    private String password;

    private boolean enabled;

    private boolean using2FA;
}
