package com.generalsoftware.kangab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.generalsoftware.kangab.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {

}
