package com.generalsoftware.kangab.service.impl;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.generalsoftware.kangab.dto.BoardUpdateUsersDto;
import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.model.Board;
import com.generalsoftware.kangab.model.User;
import com.generalsoftware.kangab.repository.BoardRepository;
import com.generalsoftware.kangab.service.BoardService;
import com.generalsoftware.kangab.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository repository;
    private final UserService userService;

    @Override
    public List<Board> findByUser(String userEmail) {
        User user = userService.findUserByEmail(userEmail);

        return repository.findByMembers(user);
    }

    @Override
    public Board findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Board", "id", id));
    }

    @Override
    public Board create(String userEmail, Board board) {
        if (repository.existsByNameIgnoreCase(board.getName())) {
            throw new ResourceAlreadyExistException("Board", "name", board.getName());
        }

        User user = userService.findUserByEmail(userEmail);
        board.setOwner(user);
        board.setMembers(Arrays.asList(user));

        return repository.save(board);
    }

    @Override
    public Board update(Board data) {
        Board board = repository.findById(data.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Board", "id", data.getId()));

        return repository.save(board.toBuilder().name(data.getName()).description(data.getDescription()).build());
    }

    @Override
    public Board addUsers(Long id, BoardUpdateUsersDto usersToAdd) {
        Board board = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board", "id", id));

        usersToAdd.getUsers().stream().forEach(userEmail -> {
            User user = userService.findUserByEmail(userEmail);
            if (!board.getMembers().contains(user))
                board.getMembers().add(user);
        });

        return repository.save(board);
    }

    @Override
    public Board removeUsers(Long id, BoardUpdateUsersDto usersToRemove) {
        Board board = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board", "id", id));

        usersToRemove.getUsers().stream().forEach(userEmail -> {
            User user = userService.findUserByEmail(userEmail);
            if (board.getMembers().contains(user))
                board.getMembers().remove(user);
        });

        board.getMembers().forEach(user -> System.out.println("user: " + user.getEmail()));

        return repository.save(board);
    }

    @Override
    public void delete(Long id) {
        Board board = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board", "id", id));

        repository.delete(board);
    }

}