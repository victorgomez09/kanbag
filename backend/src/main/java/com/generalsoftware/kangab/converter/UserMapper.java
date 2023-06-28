package com.generalsoftware.kangab.converter;

import org.mapstruct.Mapper;

import com.generalsoftware.kangab.dto.UserDto;
import com.generalsoftware.kangab.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User target);
}