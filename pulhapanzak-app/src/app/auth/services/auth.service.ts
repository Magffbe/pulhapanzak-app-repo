import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import {Firestore} from '@angular/fire/firestore';
import {LoginDto} from '../models/login';
//import { Router } from '@angular/router';
//import { ToastController } from '@ionic/angular';


const PATH = 'users';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
     private _auth = inject (Auth) 

     async getCurrentUser(): Promise<User | null>{
      return new Promise ((resolve) => {
        this._auth.onAuthStateChanged((user) => {
          resolve(user);
        });
      });
     }

     async isUserLoggedIn():Promise<boolean>{
      const user = await this.getCurrentUser();
      return !!user;
     }

     async createUserWithEmailAndPassword(model: LoginDto): Promise<UserCredential> {
      const isUserLoggedIn = await this.isUserLoggedIn();
      if (isUserLoggedIn) {
      return Promise.reject('User is already logged in');
     }

     return await createUserWithEmailAndPassword(this._auth, model.email, model.password);
    }

    async signInWithEmailAndPassword(model: LoginDto): Promise<UserCredential> {
      const isUserLoggedIn = await this.isUserLoggedIn();
      if (isUserLoggedIn) {
        return Promise.reject('User is already logged in');
      }

      return await signInWithEmailAndPassword(this._auth, model.email, model.password);
    }


    
  }




