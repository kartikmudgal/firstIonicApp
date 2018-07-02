import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';//for firebase
import { AngularFireAuthModule } from 'angularfire2/auth';//for authorisation
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {HttpModule} from '@angular/http';//for push notifications,
import {HttpClientModule,HttpClient} from '@angular/common/http';//for notification,translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';//for translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//for translate

import {Push } from '@ionic-native/push';//plugin for notification
import {Camera} from '@ionic-native/camera';//plugin for camera

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {LoggedinPage} from '../pages/loggedin/loggedin';
import {ChatPage} from '../pages/chat/chat';




export function setTranslateLoader(http: HttpClient) {
 return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const firebaseAuth = {
    apiKey: "AIzaSyD_NV1nFiw9jW-DirilXMYRv7J6914KJWs",
    authDomain: "test-project-6a1e0.firebaseapp.com",
    databaseURL: "https://test-project-6a1e0.firebaseio.com",
    projectId: "test-project-6a1e0",
    storageBucket: "test-project-6a1e0.appspot.com",
    messagingSenderId: "89205317632"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
       provide: TranslateLoader,
       useFactory: (setTranslateLoader),
       deps: [HttpClient]
     }
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Push,
    Camera
  ]
})
export class AppModule {}
