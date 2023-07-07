package com.generalsoftware.kangab.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.generalsoftware.kangab.dto.ColumnDto;
import com.generalsoftware.kangab.model.Column;

@Mapper(componentModel = "spring", uses = CardMapper.class)
public interface ColumnMapper {

    @Mappings({
            @Mapping(target = "board", ignore = true),
            @Mapping(target = "order", ignore = true),
            @Mapping(target = "cards", ignore = true),
            @Mapping(target = "creationDate", ignore = true),
            @Mapping(target = "modificationDate", ignore = true)
    })
    Column toEntity(String name);

    ColumnDto toDto(Column target);
}
