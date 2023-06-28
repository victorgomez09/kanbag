package com.generalsoftware.kangab.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.dto.UserDto;
import com.generalsoftware.kangab.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User target);

    @Mappings({
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "secret", ignore = true)
    })
    User toEntityFromCreateDto(SignUpDto target);
}