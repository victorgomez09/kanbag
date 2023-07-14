import { User } from 'src/app/auth/models/user.model';
import { Column } from './column.model';

export interface Board {
  id: number;
  name: string;
  description: string;
  owner: User;
  members: User[];
  columns: Column[]
}
