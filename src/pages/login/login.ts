import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import {  NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';//to verify email and password

import {LoggedinPage} from '../loggedin/loggedin';
//import {ChatPage} from '../chat/chat';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public ref: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showAlert(message: string){
  	const alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    this.ref.detectChanges();
  }

  loginUser(){
  	this.fire.auth.signInWithEmailAndPassword(this.user.value,this.password.value)//inbuilt function to check whether username and password are correct or not(return a promise<>)
  	.then(data => {
  		console.log('got some data',data);
  		this.showAlert("Successfully logged in");
  		this.navCtrl.setRoot(LoggedinPage);
  		//this.navCtrl.setRoot(ChatPage);
  		//user is logged in
  	})
  	.catch(error => {
  		this.showAlert(error.message);
  		console.log('got an error',error);

  	})
  	this.ref.detectChanges();
  	//console.log('Would Sign in with:',this.user.value,this.password.value);
  }
  resetPassword(){//sends a link to reset the password on their account
  	//make it prompt alert to take emailId(right now accessing email in the login form.)
  	this.fire.auth.sendPasswordResetEmail(this.user.value)
  	.then(data => {
  		console.log('got some data',data);
  		this.showAlert("Reset link sent to email");
  		//user is being set password reset link
  	})
  	.catch(error => {
  		this.showAlert(error.message);
  		console.log('got an error',error);

  	})
  	this.ref.detectChanges();
  }

}
