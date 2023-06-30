import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./landing/landing.routes').then(mod => mod.LANDING_ROUTES)
    },
    {
        path: 'app',
        loadChildren: () => import('./home/home.routes').then(mod => mod.HOME_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(mod => mod.AUTH_ROUTES)
    },
];
