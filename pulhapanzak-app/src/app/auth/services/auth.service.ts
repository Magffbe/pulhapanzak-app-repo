import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore'; // Import AngularFirestore
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Login } from '../models/login';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Firestore: any;
  signInWithEmailAndPassword(loginData: Login) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private afAuth: Auth,
    private firestore: Firestore, 
    private router: Router,
    private toastController: ToastController
  ) {}

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.afAuth, email, password);
      this.router.navigate(['/tabs/home']);
      this.showToast('Inicio de sesión exitoso', 'success');
    } catch (error: any) {
      this.showToast(error.message, 'danger');
    }
  }

  async register(email: string, password: string, userData: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
      await this.Firestore ('users').doc(userCredential.user.uid).set(userData);
      this.router.navigate(['/home']);
      this.showToast('Registro exitoso', 'success');
    } catch (error: any) {
      this.showToast(error.message, 'danger');
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.afAuth, email);
      this.showToast('Correo de restablecimiento enviado', 'success');
    } catch (error: any) {
      this.showToast(error.message, 'danger');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
