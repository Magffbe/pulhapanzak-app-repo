import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/ui/pages/register/register.page').then( m => m.RegisterPageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/ui/pages/login/login.page').then( m => m.LoginPage)
  },
];
    

