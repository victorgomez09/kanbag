import { Column } from './column.model';
import { User } from './user.model';

export interface Board {
  id: number;
  name: string;
  description: string;
  owner: User;
  members: User[];
  columns: Column[]
}

export interface CreateBoard {
  name: string;
  description: string;
}