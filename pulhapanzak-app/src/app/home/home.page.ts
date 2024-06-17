import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  user = {
    email: '',
    password: '',
    toastCtrl: 'any',
  };



  constructor(private authService: AuthService, private toastCtrl: ToastController) {
    this.toastCtrl = toastCtrl;
  
}

async login() {
  try {
    await this.authService.login(this.user.email, this.user.password);
    this.toastCtrl.create({
      message: 'Iniciaste sesión correctamente',
      duration: 2000,
    }).then((toast) => toast.present());
  } catch (error) {
    this.toastCtrl.create({
      message: 'Error al iniciar sesión',
      duration: 2000,
    }).then((toast) => toast.present());
  }
}
}
