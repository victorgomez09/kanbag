import { Board } from "./board.model";
import { Card } from "./card.model";

export interface Column {
    id: number;
    name: string;
    board: Board[];
    cards: Card[];
}