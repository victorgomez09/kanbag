import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing.routes').then((mod) => mod.LANDING_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/register/register.routes').then((mod) => mod.REGISTER_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.routes').then((mod) => mod.LOGIN_ROUTES),
  },
  {
    path: 'boards',
    loadChildren: () =>
      import('./pages/boards/boards.routes').then((mod) => mod.BOARDS_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: 'boards',
    loadChildren: () =>
      import('./pages/board/board.routes').then((mod) => mod.BOARD_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/not-found/not-found.routes').then(
        (mod) => mod.NOT_FOUND_ROUTES
      ),
    canActivate: [AuthGuard],
  },
];
