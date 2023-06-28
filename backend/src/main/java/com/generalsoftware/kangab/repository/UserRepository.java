package com.generalsoftware.kangab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generalsoftware.kangab.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}
