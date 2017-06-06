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
			title: 'New item',
			inputs: [
				{
					name: 'name',
          placeholder: 'Name'
				},
        {
          name: 'description',
          placeholder: 'Description'
        }
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
							if(data.description == '') {
								data.description == '';
							}
							this.items.push({
							name: data.name,
              description: data.description
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
	updateItem(itemId, itemTitle, itemDescription){
		let prompt = this.alertCtrl.create({
			title: itemTitle,
			message: "Edit this item",
			inputs: [
				{
					name: 'name',
					placeholder: 'Name',
					value: itemTitle
				},
				{
					name: 'description',
					placeholder: 'Description',
					value: itemDescription
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
							name: data.name,
							description: data.description
						});
					}
				}
			]
		});
		prompt.present();
	}

}
  
