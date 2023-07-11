export interface Card {
    id?: number;
    title: string;
    description?: string;
    order?: number;
    columnId: number;
}

export interface UpdateCardOrder {
    id: number;
    order: number;
}