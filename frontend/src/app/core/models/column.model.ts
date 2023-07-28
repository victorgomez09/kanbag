import { Card } from './card.model';

export interface Column {
  id: number;
  name: string;
  order: number;
  boardId: number;
  cards: Card[];
}

export interface CreateColumn {
  boardId: number;
  name: string;
}
