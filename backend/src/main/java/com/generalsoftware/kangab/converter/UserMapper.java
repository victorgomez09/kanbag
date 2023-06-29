package com.generalsoftware.kangab.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.dto.UserDto;
import com.generalsoftware.kangab.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "boards", ignore = true)
    UserDto toDto(User target);

    @Named("noBoards")
    @Mappings({
            @Mapping(target = "boards", ignore = true),
            @Mapping(target = "using2FA", ignore = true)
    })
    UserDto toDtoWithoutBoards(User user);

    @Mappings({
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "secret", ignore = true),
    })
    User toEntity(UserDto target);

    @Mappings({
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "secret", ignore = true),
            @Mapping(target = "boards", ignore = true)
    })
    User toEntityFromCreateDto(SignUpDto target);

}