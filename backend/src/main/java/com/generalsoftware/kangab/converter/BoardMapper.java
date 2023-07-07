package com.generalsoftware.kangab.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import org.mapstruct.Mapping;

import com.generalsoftware.kangab.dto.BoardCreateDto;
import com.generalsoftware.kangab.dto.BoardDto;
import com.generalsoftware.kangab.dto.BoardUpdateDto;
import com.generalsoftware.kangab.model.Board;

@Mapper(componentModel = "spring", uses = { UserMapper.class, CardMapper.class })
public interface BoardMapper {

        @Mapping(target = "columns", ignore = true)
        Board toEntity(BoardDto target);

        @Mappings({
                        @Mapping(target = "owner", qualifiedByName = "noBoards"),
                        @Mapping(target = "members", qualifiedByName = "noBoards"),
                        // @Mapping(target = "columns[].cards[].name", ignore = true)
        })
        BoardDto toDto(Board target);

        @Mappings({
                        @Mapping(target = "owner", ignore = true),
                        @Mapping(target = "members", ignore = true),
                        @Mapping(target = "creationDate", ignore = true),
                        @Mapping(target = "modificationDate", ignore = true),
                        @Mapping(target = "columns", ignore = true)
        })
        Board toEntityFromCreateDto(BoardCreateDto target);

        @Mappings({
                        @Mapping(target = "owner", ignore = true),
                        @Mapping(target = "members", ignore = true),
                        @Mapping(target = "creationDate", ignore = true),
                        @Mapping(target = "modificationDate", ignore = true),
                        @Mapping(target = "columns", ignore = true)
        })
        Board toEntityFromUpdateDto(BoardUpdateDto target);

}
