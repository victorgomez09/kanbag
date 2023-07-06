import { User } from 'src/app/auth/models/user.model';

export interface Board {
  id: number;
  name: string;
  description: string;
  owner: User;
}
