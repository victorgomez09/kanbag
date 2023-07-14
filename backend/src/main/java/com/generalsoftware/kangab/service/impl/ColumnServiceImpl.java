package com.generalsoftware.kangab.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Board;
import com.generalsoftware.kangab.model.Column;
import com.generalsoftware.kangab.repository.ColumnRepository;
import com.generalsoftware.kangab.service.BoardService;
import com.generalsoftware.kangab.service.ColumnService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class ColumnServiceImpl implements ColumnService {

    private final ColumnRepository repository;
    private final BoardService boardService;

    @Override
    public Column findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Column", "id", id));
    }

    @Override
    public Column create(Long boardId, Column data) {
        Board board = boardService.findById(boardId);
        Long order = repository.countByBoard(board);
        System.out.println("data: " + data.toString());

        return repository.save(data.toBuilder().order(order).board(board).build());
    }

    @Override
    public Column update(Long id, Column data) {
        Column column = repository.findById(data.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Column", "id", data.getId()));
        column.setName(data.getName());
        column.setCards(new ArrayList<>(column.getCards()));

        return repository
                .save(column);
    }

    @Override
    public List<Column> updateOrder(List<Column> data) {
        List<Column> result = new ArrayList<>();

        data.stream().forEach(item -> {
            Column card = repository.findById(item.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Column", "id", item.getId()));
            card.setOrder(item.getOrder());

            result.add(repository.save(card));
        });

        return result;
    }

    @Override
    public void delete(Long id) {
        Column column = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column", "id", id));

        repository.delete(column);
    }

}
