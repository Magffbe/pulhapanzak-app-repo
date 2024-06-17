import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';
import { HomePage } from './home/home.page'; 
import { NgModule } from '@angular/core';
import { LoginPage } from './auth/ui/pages/login/login.page';
import { RegisterPageComponent } from './auth/ui/pages/register/register.page';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },




  {path: 'login',
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

    

