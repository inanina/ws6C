import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  item;
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public db: AngularFireDatabase) {
      this.item = navParams.get("item");
      this.items = this.db.list('/items');
  }

  addItem(itemId){
		let prompt = this.alertCtrl.create({
			title: 'Item Name',
			inputs: [
				{
					name: 'item',
          			placeholder: 'Name'
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
						this.items.update(itemId, {
							item: data.item
						});
					}
				}
			]
		});
		prompt.present();
	}

}
