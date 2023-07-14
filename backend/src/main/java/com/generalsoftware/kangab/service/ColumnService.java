package com.generalsoftware.kangab.service;

import java.util.List;

import com.generalsoftware.kangab.model.Column;

public interface ColumnService {

    Column findById(Long id);

    Column create(Long boardId, Column data);

    Column update(Long id, Column data);

    List<Column> updateOrder(List<Column> data);

    void delete(Long id);

}
