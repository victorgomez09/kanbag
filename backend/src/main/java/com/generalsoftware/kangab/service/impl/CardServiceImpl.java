package com.generalsoftware.kangab.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Card;
import com.generalsoftware.kangab.model.Column;
import com.generalsoftware.kangab.repository.CardRepository;
import com.generalsoftware.kangab.service.CardService;
import com.generalsoftware.kangab.service.ColumnService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService {

    private CardRepository repository;
    private ColumnService columnService;

    @Override
    public Card create(Long columnId, Card data) {
        Column column = columnService.findById(columnId);

        data.setColumn(column);
        data.setOrder(column.getCards().size());
        data.setUsers(Collections.emptyList());

        return repository.save(data);
    }

    @Override
    public List<Card> updateOrder(List<Card> data) {
        List<Card> result = Collections.emptyList();

        data.stream().forEach(item -> {
            Card card = repository.findById(item.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Card", "id", item.getId()));
            result.add(repository.save(card.toBuilder().order(item.getOrder()).build()));
        });

        return result;
    }

}
