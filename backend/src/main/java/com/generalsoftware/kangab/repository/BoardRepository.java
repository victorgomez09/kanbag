package com.generalsoftware.kangab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.generalsoftware.kangab.model.Board;
import com.generalsoftware.kangab.model.User;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByMembers(User user);

    boolean existsByNameIgnoreCase(String name);

}
