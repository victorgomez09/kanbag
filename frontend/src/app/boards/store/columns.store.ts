import { Injectable, WritableSignal, signal } from "@angular/core";
import { Column } from "../model/column.model";

@Injectable({
    providedIn: 'root'
})
export class ColumnState {

    private _columns: WritableSignal<Column[]> = signal([])

    public getColumns(): Column[] {
        return this._columns();
    }

    public setColumns(columns: Column[]): void {
        this._columns.set(columns);
    }

    public updateColumns(column: Column): void {
        this._columns.update(oldColumn => [...oldColumn, column]);
    }
}