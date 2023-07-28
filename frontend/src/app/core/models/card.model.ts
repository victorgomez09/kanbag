import { User } from "./user.model";

export interface Card {
  id?: number;
  title: string;
  description?: string;
  order?: number;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  columnId: number;
  users?: User[];
}

export interface CreateCard {
  columnId: number;
  title: string;
}

export interface UpdateCardOrder {
  id: number;
  order: number;
}
