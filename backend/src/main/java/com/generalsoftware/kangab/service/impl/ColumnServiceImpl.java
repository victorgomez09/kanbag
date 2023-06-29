package com.generalsoftware.kangab.service.impl;

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

        return repository.save(data.toBuilder().board(board).build());
    }

    @Override
    public Column update(Column data) {
        Column column = repository.findById(data.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Column", "id", data.getId()));

        return repository.save(column.toBuilder().name(data.getName()).build());
    }

}
