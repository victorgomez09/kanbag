import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.routes').then((mod) => mod.LANDING_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.routes').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'boards',
    loadChildren: () =>
      import('./boards/boards.routes').then((mod) => mod.BOARDS_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./not-found/not-found.routes').then(
        (mod) => mod.NOT_FOUND_ROUTES
      ),
    canActivate: [AuthGuard],
  },
];
