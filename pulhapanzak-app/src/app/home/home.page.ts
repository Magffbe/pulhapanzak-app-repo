import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRouterLink } from '@ionic/angular/standalone';
//import { AuthService } from '../auth/services/auth.service';
//import { ToastController } from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonRouterLink, IonHeader, IonToolbar, IonTitle, IonContent],
})

export class HomePage {

className: string = 'Phullapanzak';
 user: UserDto = {name: 'Charles Leclerc', id: 1};
 currentDate: Date = new Date();

 showButton: boolean = true; 
 age: number = 26;
 classCss: string = 'font-color';

 constructor() {}

 save(): void {
  console.log('Save');
  this.age = this.age + 1;
  this.showButton = !this.showButton;
  console.log(this.age);
 }

showAge(): void {
  alert(this.age);

}
}

export interface UserDto { 
  name: string; 
  id: number;
}
