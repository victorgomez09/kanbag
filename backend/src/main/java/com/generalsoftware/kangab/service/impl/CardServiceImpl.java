package com.generalsoftware.kangab.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Card;
import com.generalsoftware.kangab.model.Column;
import com.generalsoftware.kangab.model.Priority;
import com.generalsoftware.kangab.model.User;
import com.generalsoftware.kangab.repository.CardRepository;
import com.generalsoftware.kangab.service.CardService;
import com.generalsoftware.kangab.service.ColumnService;
import com.generalsoftware.kangab.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService {

    private CardRepository repository;
    private ColumnService columnService;
    private UserService userService;

    @Override
    public Card create(Long columnId, Card data) {
        Column column = columnService.findById(columnId);

        data.setColumn(column);
        data.setOrder(column.getCards() == null ? 0 : column.getCards().size());
        data.setUsers(new ArrayList<>());
        data.setPriority(Priority.LOW);

        return repository.save(data);
    }

    @Override
    public Card update(Long id, Card data) {
        Card card = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Card", "id", id));

        card.setTitle(data.getTitle());
        card.setDescription(data.getDescription());
        card.setPriority(data.getPriority());

        return repository.save(card);
    }

    @Override
    public List<Card> updateOrder(List<Card> data) {
        List<Card> result = new ArrayList<>();

        data.stream().forEach(item -> {
            Card card = repository.findById(item.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Card", "id", item.getId()));
            card.setOrder(item.getOrder());
            card.setUsers(new ArrayList<>(card.getUsers()));

            result.add(repository.save(card));
        });

        return result;
    }

    @Override
    public List<Card> updateOrderAndColumn(List<Card> prevData, List<Card> currentData) {
        List<Card> result = new ArrayList<>();

        prevData.stream().forEach(item -> {
            Card card = repository.findById(item.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Card", "id", item.getId()));
            card.setOrder(item.getOrder());
            card.setUsers(new ArrayList<>(card.getUsers()));
            card.setColumn(columnService.findById(item.getColumn().getId()));

            result.add(repository.save(card));
        });

        currentData.stream().forEach(item -> {
            Card card = repository.findById(item.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Card", "id", item.getId()));
            card.setOrder(item.getOrder());
            card.setUsers(new ArrayList<>(card.getUsers()));
            card.setColumn(columnService.findById(item.getColumn().getId()));

            result.add(repository.save(card));
        });

        return result;
    }

    @Override
    public Card manageUsers(Long id, List<String> usersEmail) {
        Card card = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card", "id", id));

        List<User> users = new ArrayList<>();
        usersEmail.stream().forEach(userEmail -> {
            User user = userService.findUserByEmail(userEmail);
            users.add(user);
        });
        card.setUsers(new ArrayList<>(users));

        return repository.save(card);
    }

}
