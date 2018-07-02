import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import {  NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';//for authorization(not needed here)
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';//for firebase database
import {AngularFirestore} from 'angularfire2/firestore';
import {Camera, CameraOptions} from '@ionic-native/camera';


import {HomePage} from '../home/home';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

	subscription;
	username: string = '';
	messageChat: string = '';
	messages: object[] =  [];
  base64Image: string = '';
  _chatSubscription;
  constructor(public fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public db: AngularFireDatabase,public ref: ChangeDetectorRef, public camera: Camera,public firestore: AngularFirestore) {
  	this.username = fire.auth.currentUser.email;
  	this.messageChat = navParams.get('messageChat');
  	this._chatSubscription = this.db.list('/chat').valueChanges().subscribe(//db.list() throwing typeError : object(...) not found
  		data => {
  			this.messages = data;
  			console.log(data);
  		},
  		error => {
  			this.showAlert(error.message);
  			console.log('got an error',error);
  		});
  	//used to get all the data in database
  	  }


  ionViewDidLoad(){
    console.log('ionViewDidLoad ChatPage');
  }
  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
    this.ref.detectChanges();
  }

  showAlert(message: string){
  	const alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm() {
      const confirm = this.alertCtrl.create({
        title: 'ALERT',
        message: 'Are you sure you want to delete your account?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes clicked');
              this.remove();

            }
          },
          {
            text: 'No',
            handler: () => {
              console.log('No clicked');
              //do nothin
            }
          }
        ]
      });
      confirm.present();
      this.ref.detectChanges();
    }


  sendMessage(){
  	// this.db.list('/chat').push({
  	// 	username: this.username,
  	// 	messageChat: this.messageChat
  	// })
  	// .then((data) =>
  	// 	{
  	// 		console.log('send',data);
  	// 	});
    this.firestore.collection('/chat').add({
         'username' : this.username,
         'messageChat' : this.messageChat
       })
      .then((data) =>
        {
          console.log('send',data);
        });
  	this.messageChat = "";
    this.ref.detectChanges();
  }

  remove(){
  	this.fire.auth.currentUser.delete()
  	.then(data => {
  		console.log('delete',data);
  		this.showAlert("Account permanently removed");
  		this.navCtrl.setRoot(HomePage);
  	})
  	.catch(error => {
  		this.showAlert(error.message);
  		console.log('got an error',error);

  	})
  	  	this.ref.detectChanges();

  }

  logout(){
  	this.navCtrl.setRoot(HomePage);
  	this.showAlert('Logged Out');
  	this.ref.detectChanges();
  }

}
