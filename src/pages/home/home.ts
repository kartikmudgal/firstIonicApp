import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController, NavParams,IonicPage, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';
import {LoggedinPage} from '../loggedin/loggedin';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public fire: AngularFireAuth, public toastCtrl: ToastController, public ref: ChangeDetectorRef) {

  }

  loginWithFb(){

    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then( res => {
        console.log(res);
        this.navCtrl.setRoot(LoggedinPage);
    })

    this.ref.detectChanges();

  }

  signIn(){
  	this.navCtrl.push(LoginPage);
        this.ref.detectChanges();

  }

  register(){
    this.navCtrl.push(RegisterPage);
    this.ref.detectChanges();

  }

}
