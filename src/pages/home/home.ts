import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ContactPage } from '../contact/contact';
//import { environment } from '../environments/environment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
      this.items = this.db.list('/items');
  }

  viewItem(item) {
    //console.log(item);
    this.navCtrl.push(ContactPage, {
      item: item
    });
  }

  addItem(){
		let prompt = this.alertCtrl.create({
			title: 'Item Name',
			message: "What do you need to spend money on?",
			inputs: [
				{
					name: 'name',
          description: 'description',
				},
				],
				buttons: [
				{
					text: 'Cancel',
					handler: data => {
					console.log('Cancel clicked');
					}
				},
				{
					text: 'Save',
					handler: data => {
						if(data.name != ''){
							this.items.push({
							name: data.name
							});
						}
					}
				}
			]
		});
		prompt.present();
	}

  removeItem(itemId: string){
		this.items.remove(itemId);
	}
	updateItem(itemId, itemTitle){
		let prompt = this.alertCtrl.create({
			title: itemTitle,
			message: "Edit the name for this item",
			inputs: [
				{
					name: 'name',
					placeholder: 'Name',
					value: itemTitle
				},
			],
			buttons: [
				{
					text: 'Cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Save',
					handler: data => {
						this.items.update(itemId, {
							name: data.name
						});
					}
				}
			]
		});
		prompt.present();
	}

}
  
