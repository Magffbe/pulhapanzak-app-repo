import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

const firebaseConfig = {
  ...environment.firebaseConfig,
  apiKey: 'AIzaSyAVzpRQ_boM8uDhJVT1LiN1kY8dVwkLYdY',
  authDomain: 'pulha-app-9fbcd.firebaseapp.com',
  projectId: 'pulha-app-9fbcd',
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FirebaseAppModule,
    AppComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],

  providers: [
    { provide: 'auth', useValue: auth },
    { provide: 'db', useValue: db },
  ],
  bootstrap: [],
})
export class AppModule {}
    
