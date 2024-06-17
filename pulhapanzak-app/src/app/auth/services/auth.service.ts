import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Import createUserWithEmailAndPassword and sendPasswordResetEmail functions from firebase/auth
import { Firestore, doc, collection} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword function from firebase/auth
import { Auth } from '@angular/fire/auth';




@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(
     private Auth: Auth,
      private firestore: Firestore, // Change the type of 'firestore' to AngularFirestore
      private router: Router,
      private toastController: ToastController
    ) {}
  
    async login(email: string, password: string) {
      try {
        await signInWithEmailAndPassword(this.Auth, email, password); // Call signInWithEmailAndPassword function with afAuth as the first argument
        this.router.navigate(['/home']);
        this.showToast('Inicio de sesión exitoso', 'success');
      } catch (error:any) {
        this.showToast(error.message, 'danger');
      }
    
    }
  
    async register(email: string, password: string, userData: any) {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.Auth, email, password); // Call createUserWithEmailAndPassword function with afAuth as the first argument
        await this.firestore.collection('users').doc(userCredential.user.uid).set(userData); // Call 'doc' method on 'collection' and then call 'set' method on the resulting 'DocumentReference'
        this.router.navigate(['/home']);
        this.showToast('Registro exitoso', 'success');
      } catch (error:any) {
        this.showToast(error.message, 'danger');
      }
    }
  
    async resetPassword(email: string) {
      try {
        await sendPasswordResetEmail(this.Auth, email); // Call sendPasswordResetEmail function with afAuth as the first argument
        this.showToast('Correo de restablecimiento enviado', 'success');
      } catch (error:any) {
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




