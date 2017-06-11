import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import AngularFire Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
//import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';

// AngularFire Settings
export const firebaseConfig = {
	apiKey: "AIzaSyC-2mXycHj4jIG1_ZIwSkckdP4Szpxs9Vk",
    authDomain: "grillo-231f6.firebaseapp.com",
    databaseURL: "https://grillo-231f6.firebaseio.com",
    projectId: "grillo-231f6",
    storageBucket: "grillo-231f6.appspot.com",
    messagingSenderId: "1020711970613"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ListPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ListPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
