import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
import { LoginDto } from 'src/app/auth/models/login';
import { AuthService} from 'src/app/auth/services/auth.service';

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
private _authService = inject(AuthService);
private formBuilder = inject(FormBuilder);
private _router = inject(Router);
private toastController = inject(ToastController);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get isEmailInvalid(): boolean {
    const control = this.loginForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control = this.loginForm.get('email');
    return control ? control.hasError('required') && control.touched : false; 
  }

  get isPasswordInvalid(): boolean {
    const control = this.loginForm.get('password');
    return control ? control.hasError('required') && control.touched : false;

  }
 
get isFormInvalid(): boolean {
  return this.loginForm.invalid;
}

OnSubmit(): void {
  if (this.isFormInvalid) {
    const login: LoginDto = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value,
    };

    this._authService.signInWithEmailAndPassword(login).then(() => {
      this._router.navigate(['/home']);
      this.showAlert('Has iniciado sesión correctamente');
    }).catch((error) => {
      this.showAlert('Upps, correo o contraseña incorrectos', true);
    });
    }
  }

async showAlert(message: string, error: boolean = false): Promise<void> {
  const toast = await this.toastController.create({
    message: message,
    duration: 5000,
    position: 'bottom',
    color: error ? 'danger' : 'success',
  });

  await toast.present();
}

}
  


  
