import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showAlert(message: string){
  	const alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  registerUser(){
  	this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value).then(
  		success => {
  			let user:any = firebase.auth().currentUser;
  			           user.sendEmailVerification().then(
  			             (success) => {console.log("please verify your email");
  			             				this.showAlert("Verify Your Email To Login");
  			         }
  			           ).catch(
  			             (error) => {
  			             	this.showAlert(error.message);
  			               console.log('got an error',error);
  			             }
  			           )
  						})
  	.catch(error => {
  		this.showAlert(error.message);
  		console.log('got an error',error);});
  }

}
