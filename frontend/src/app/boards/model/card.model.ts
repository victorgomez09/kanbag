export interface Card {
    id?: number;
    title: string;
    description?: string;
    order?: number;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    columnId: number;
}

export interface UpdateCardOrder {
    id: number;
    order: number;
}