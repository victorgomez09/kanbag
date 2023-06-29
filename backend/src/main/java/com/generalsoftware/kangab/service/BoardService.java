package com.generalsoftware.kangab.service;

import java.util.List;

import com.generalsoftware.kangab.dto.AddRemoveUsersDto;
import com.generalsoftware.kangab.model.Board;

public interface BoardService {

    List<Board> findByUser(String userEmail);

    Board findById(Long id);

    Board create(String userEmail, Board data);

    Board update(Board data);

    Board addUsers(Long id, AddRemoveUsersDto usersEmail);

    Board removeUsers(Long id, AddRemoveUsersDto usersEmail);

    void delete(Long id);
}
