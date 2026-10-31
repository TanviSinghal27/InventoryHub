import { Routes } from '@angular/router';
import { authGuard } from './services/auth';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login').then((m) => m.Login) },
  {
    path: '',
    loadComponent: () => import('./helper/header/header').then((m) => m.Header),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./components/category/category').then((m) => m.CategoryComponent),
      },
      {
        path: 'product',
        loadComponent: () => import('./components/products/products').then((m) => m.Products),
      },
      {
        path: 'order',
        loadComponent: () => import('./components/order/order').then((m) => m.OrderComponent),
      },
    ],
  },
];
