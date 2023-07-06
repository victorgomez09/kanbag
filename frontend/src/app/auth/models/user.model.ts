import { Board } from 'src/app/boards/model/board.model';

export interface User {
  email: string;
  displayName: string;
  enabled: boolean;
  boards: Board[];
}
