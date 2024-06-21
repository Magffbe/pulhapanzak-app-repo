// register-page.component.ts
import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
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
import {UserDto} from 'src/app/auth/models/user';

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

  private formBuilder: FormBuilder = inject (FormBuilder);
  registerForm: FormGroup;
  toastController: ToastController = inject (ToastController);

  constructor(){
  this.registerForm = this.formBuilder.group({
    Name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    dni: [
      '',
      [
        Validators.required,
        Validators.minLength(13),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
  });
}

  get isNameRequired(): boolean {
    const control = this.registerForm.get('Name');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isLastNameRequired(): boolean {
    const control = this.registerForm.get('lastname');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isEmailInvalid(): boolean {
    const control = this.registerForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control = this.registerForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPasswordRequired(): boolean {
    const control = this.registerForm.get('password');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isDniRequired(): boolean {
    const control = this.registerForm.get('dni');
    return control ? control.hasError('required') && control.touched : false;

  }

  get isDniValid(): boolean {
    const control = this.registerForm.get('dni');
    return control ? control.hasError('pattern') && control.touched : false;
  }

get isDniPattern(): boolean {
  const control = this.registerForm.get('dni');
  return control ? control.hasError('pattern') && control.touched : false;
}
  
get isPhoneNumberRequired(): boolean {
  const control = this.registerForm.get('phoneNumber');
  return control ? control.hasError('required') && control.touched : false;
}

get isPhoneNumberPattern(): boolean {
  const control = this.registerForm.get('phoneNumber');
  return control ? control.hasError('pattern') && control.touched : false;
}

  get isPhoneNumberValid(): boolean {
    const control = this.registerForm.get('phoneNumber');
    return control ? control.hasError('pattern') && control.touched : false;
  }

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }

  register(): void {
    if(this.registerForm.valid) {
      const register: UserDto = {
        Name: this.registerForm.get('name')?.value,
        lastName: this.registerForm.get('lastname')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        dni: this.registerForm.get('dni')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
       
      };
      console.log(register);
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


  