// register-page.component.ts
import { Component, Inject, OnInit, inject} from '@angular/core';
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
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService} from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPageComponent {
togglePassword() {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
goBack() {
throw new Error('Method not implemented.');
}
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    
    @Inject(AuthService) private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.minLength(13), Validators.pattern('^[0-9]*$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get dni() {
    return this.registerForm.get('dni');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password, ...userData } = this.registerForm.value;
      this.authService.register(email, password, userData);
    }
  }
}


