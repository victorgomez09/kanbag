package com.generalsoftware.kangab.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCardOrderAndColumn {

    private List<CardDto> prevColumn;

    private List<CardDto> currentColumn;
}
