import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Camera, GalleryImageOptions } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc} from 'firebase/firestore';
import { FirebaseStorage, Storage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonText, IonTitle, IonToolbar, IonImg, IonItem } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { PushNotifications } from '@capacitor/push-notifications';





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


  ngOnInit() {
    this.configurePushNotifications();
  }
  
  private async configurePushNotifications() {
    if (this.capacitor && await this.capacitor.isPluginAvailable('PushNotifications')) {
      const pushNotifications = PushNotifications.addListener('registration', (token) => {
        console.log('Push notification token:', token.value);
        this.saveTokenToFirestore(token.value);
      });
  
      await PushNotifications.requestPermissions();
  
  
      const permissions = await PushNotifications.checkPermissions();
      if (permissions && permissions.hasOwnProperty('state') && permissions.receive === 'granted') {
       
        console.log('Push notifications permissions granted');
      } else {
      
        console.log('Push notifications permissions not granted');
      }
    } else {
      console.error('Push notifications plugin not available');
    }
  }
  
  private async saveTokenToFirestore(token: string) {
    const userRef= this.FirebaseStorage.doc(`users/${this.auth.currentUser?.uid}`);
    await userRef.update({ fcmToken: token });
  }
  

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
      const options: GalleryImageOptions = {}; // Add the GalleryImageOptions argument
      const image = await this.camera.pickImages(options); // Pass the options argument to pickImages()
      if (image.photos.length > 0) {
          const file = image.photos[0].path;
          if (this.auth.currentUser) {
              const storageRef = this.FirebaseStorage.storage().ref().child('users').child(`${this.auth.currentUser.uid}.png`);
              await storageRef.put(file);
          }
      }
  }
}