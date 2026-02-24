import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard], children: [
      { path: 'products', loadComponent: () => import('./features/dashboard/products/products').then(m => m.Products) },
      { path: 'create-product', loadComponent: () => import('./features/dashboard/products/create-product/create-product').then(m => m.CreateProduct) },
      { path: 'orders', loadComponent: () => import('./features/dashboard/orders/orders').then(m => m.Orders) },
      { path: 'promotions', loadComponent: () => import('./features/dashboard/promotions/promotions').then(m => m.Promotions) },
      { path: 'create-promotion', loadComponent: () => import('./features/dashboard/promotions/create-promotion/create-promotion').then(m => m.CreatePromotion) },
      { path: 'edit-banner/:id', loadComponent: () => import('./features/dashboard/promotions/edit-banner/edit-banner').then(m => m.EditBanner) }
    ]
  },
  { path: 'login', loadComponent: () => import('./features/auth/auth').then(m => m.Auth) },
  { path: '**', redirectTo: 'dashboard/products', pathMatch: 'full' }
];
