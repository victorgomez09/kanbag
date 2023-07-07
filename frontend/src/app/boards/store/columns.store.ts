import { BehaviorSubject } from "rxjs";
import { Column } from "../model/column.model";

export const $columns = new BehaviorSubject<Column[]>([])