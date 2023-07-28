import { Board } from "./board.model";

export interface User {
  email: string;
  displayName: string;
  enabled: boolean;
  boards: Board[];
}
