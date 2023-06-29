package com.generalsoftware.kangab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.generalsoftware.kangab.model.Column;

public interface ColumnRepository extends JpaRepository<Column, Long> {
}
