import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Camera, GalleryImageOptions } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseStorage, Storage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonText, IonTitle, IonToolbar, IonImg, IonItem } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
  standalone: true,
  imports: [IonImg, 
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
    IonButton,
    IonImg,
    IonItem
  ],
})
export class ProfilePageComponent {
logout() {
throw new Error('Method not implemented.');
}
  profileForm: FormGroup;
  profilePictureUrl!: string | null;
  allowEditing= true;
  FirebaseStorage: any;



  constructor(
    private formBuilder: FormBuilder,
    @Inject(Capacitor) private capacitor: typeof Capacitor,
    @Inject(Camera) private camera:  typeof Camera,
    private auth: Auth,
    private firestore: Firestore  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      idNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      birthDate: ['', [Validators.required, Validators.max(new Date().getTime())]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
    });
  }

  async selectImage() {
    const image = await this.camera.pickImages({});
    if (image.photos.length > 0) {
      const file = image.photos[0].path;
      if (this.auth.currentUser) {
        const storageRef = this.FirebaseStorage.storage().ref().child('users').child(`${this.auth.currentUser.uid}.png`);
        await storageRef.put(file);
      }
    }
  }
}