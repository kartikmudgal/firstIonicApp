import { Component,ChangeDetectorRef } from '@angular/core';
import {  NavController, NavParams,App,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Camera, CameraOptions} from '@ionic-native/camera';

import {HomePage} from '../home/home';

/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

	email: string;
	public items: any;
	public isSearchBarOpened = false;
	base64Image: string;
  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, public http: HttpClient, public ref: ChangeDetectorRef,public camera: Camera) {
  	this.email = fire.auth.currentUser.email;
  	this.getData();
  }

  //Access Camera
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

  //function to retreive json via http
  getData(){
  	//let url = 'https://jsonplaceholder.typicode.com/photos';
  	let url = 'https://api.airtable.com/v0/appVD3EB3t3Cy0Tm2/Product?api_key=keyVRIEvyfgLfQkdw';
  	let data: Observable<any> = this.http.get(url);
  	data.subscribe(
  		result => {
  			this.items = result.records;
  			console.log(this.items);
  		});
  }
  //function to search data
  // getItems(ev: any){
  // 	this.getData();
  // 	const val = ev.target.value;
  // 	//error rectify karna h
  // 	if (val && val.trim() != '') {
  // 	      this.items.fields.ProductName = this.items.fields.ProductName.filter((item) => {
  // 	        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  // 	      })
  // 	    }
  // }

  showAlert(message: string){
  	const alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
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

  /*create a function resetPassword()

	when taking input from prompt alert how to access it in typeScript file?
	like in login or register input is given an id and then in .ts a ViewChild decorator is used

	*/
	//to delete an account
  remove(){
  	this.fire.auth.currentUser.delete()
  	.then(data => {
  		console.log('delete',data);
  		this.showAlert("Account permanently removed");
  		this.navCtrl.setRoot(HomePage);
  		//user is being set password reset link
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
