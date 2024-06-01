import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonText, IonButton, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../models/user';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
})
export class AppModule { }


@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonIcon, IonBackButton, IonButtons, IonButton, IonText, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,]
})
export class RegisterPageComponent implements OnInit {
togglePassword() {
throw new Error('Method not implemented.');
}
goBack() {
throw new Error('Method not implemented.');
}
  registerForm!: FormGroup;
  passwordType: string = 'password';

  constructor(private fb: FormBuilder) {
    this.registerForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni : ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]]
    });
  }

  ngOnInit() {}

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

  
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario válido', this.registerForm.value);
    } else {
      console.log('Formulario invalido');
    }
  }
  
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

}

