import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonLabel,
  IonText,
  IonInput,
  ToastController,
} from '@ionic/angular/standalone';
import { Login } from 'src/app/auth/models/login';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService} from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

import { user } from '@angular/fire/auth';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AppModule {}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonLabel,
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
  ],
})
export class LoginPage {
goBack() {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;
  passwordType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
    }
  }

  onForgotPassword() {
    if (this.email && this.email.valid) {
      this.authService.resetPassword(this.email.value);
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}