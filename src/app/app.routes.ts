import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard), children:[
        { path: 'products', loadComponent: () => import('./features/dashboard/products/products').then(m => m.Products) },
    ] },
    { path: '', redirectTo: 'dashboard/products', pathMatch: 'full' }
];
