package com.generalsoftware.kangab.converter;

import org.mapstruct.Mapper;

import com.generalsoftware.kangab.dto.CardDto;
import com.generalsoftware.kangab.model.Card;

@Mapper(componentModel = "spring")
public interface CardMapper {

    CardDto toDto(Card target);

    Card toEntity(CardDto target);
}
