import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonLabel, IonText, IonInput } from '@ionic/angular/standalone';
import {Login} from '../models/login';
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInput]
})
export class LoginPage implements OnInit {
togglePassword() {
throw new Error('Method not implemented.');
}
goBack() {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;
  passwordType: string = 'password';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {}

get email() {
  return this.loginForm.get('email');
}

get password() {
  return this.loginForm.get('password');
}

onSubmit() {
  if (this.loginForm.valid) {
    const loginData: Login = this.loginForm.value;
    console.log('Login Data', loginData);

  }else{
    console.log('Formulario invalido');
  }

}

togglePasswordVisibility() {
  this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
}


}


