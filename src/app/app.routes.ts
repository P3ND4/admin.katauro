import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard), children: [
            { path: 'products', loadComponent: () => import('./features/dashboard/products/products').then(m => m.Products) },
            { path: 'create-product', loadComponent: () => import('./features/dashboard/create-product/create-product').then(m => m.CreateProduct) },
            { path: 'orders', loadComponent: () => import('./features/dashboard/orders/orders').then(m => m.Orders) }
            
        ]
    },
    { path: '**', redirectTo: 'dashboard/products', pathMatch: 'full' }
];
