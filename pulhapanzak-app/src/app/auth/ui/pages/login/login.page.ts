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
export class LoginPage implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private toastController = inject(ToastController);
  showAlert: any;
  
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
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (!this.loginForm || !this.loginForm.valid) {
      return;
    }
  
    const loginData: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };
  
    try {
      this._authService.signInWithEmailAndPassword(loginData);
    } catch (error) {
      this.showAlert('Ha ocurrido un error', true);
    }
  
    this._router.navigate(['/tabs/home']);
    this.showAlert('Inicio de sesión exitoso');
  } catch (error: any) {
    this.showAlert('correo o contraseña inválido', true);
    console.log(error);
  }

  togglePasswordVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    }

}



