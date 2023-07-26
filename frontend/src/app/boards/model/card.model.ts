import { User } from 'src/app/auth/models/user.model';

export interface Card {
  id?: number;
  title: string;
  description?: string;
  order?: number;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  columnId: number;
  users?: User[];
}

export interface UpdateCardOrder {
  id: number;
  order: number;
}
