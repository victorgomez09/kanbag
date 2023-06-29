package com.generalsoftware.kangab.service;

import com.generalsoftware.kangab.model.Column;

public interface ColumnService {

    Column findById(Long id);

    Column create(Long boardId, Column data);

    Column update(Column data);

}
