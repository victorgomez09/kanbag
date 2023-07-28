import { Route } from '@angular/router';

import { BoardsComponent } from './boards.component';

export const BOARDS_ROUTES: Route[] = [
  {
    path: '',
    component: BoardsComponent,
  }
];
