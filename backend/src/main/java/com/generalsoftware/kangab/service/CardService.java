package com.generalsoftware.kangab.service;

import java.util.List;

import com.generalsoftware.kangab.model.Card;

public interface CardService {

    Card create(Long columnId, Card data);

    List<Card> updateOrder(List<Card> data);
}
