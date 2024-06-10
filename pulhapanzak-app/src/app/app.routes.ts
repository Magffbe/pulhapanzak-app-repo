import { Routes } from '@angular/router';
import { PreloadAllModules, RouterModule,} from '@angular/router';
import { HomePage } from './home/home.page'; 
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
   
  {
    path: 'login',
    loadComponent: () => import('./auth/ui/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/ui/pages/register/register.page').then( m => m.RegisterPageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
