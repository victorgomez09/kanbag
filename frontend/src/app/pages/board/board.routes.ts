import { Route } from "@angular/router";

import { BoardComponent } from "./board.component";

export const BOARD_ROUTES: Route[] = [
    {
        path: ':id',
        component: BoardComponent,
    }
];
