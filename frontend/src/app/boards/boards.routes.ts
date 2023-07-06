import { Route } from '@angular/router';
import { BoardsComponent } from './boards.component';
import { BoardComponent } from './board/board.component';

export const BOARDS_ROUTES: Route[] = [
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: ':id',
    component: BoardComponent,
  },
];
