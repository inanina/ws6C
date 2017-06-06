import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  item;
  supplyItems: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public db: AngularFireDatabase) {
      this.item = navParams.get("item");
	  console.log(this.item);
      //this.supplyItems = this.db.list('/items/supplyItems');
	  this.supplyItems = this.db.list('/items/' + this.item.$key + '/supplyItems')
  }

  addItem(itemId){
		let prompt = this.alertCtrl.create({
			title: 'supplyItem Name',
			inputs: [
				{
					name: 'supplyItem',
          			placeholder: 'Name'
				},
				{
					name: 'amount',
					placeholder: 'Anzahl'
				}
				],
				buttons: [
				{
					text: 'Cancel',
					handler: data => {
					}
				},
				{
					text: 'Save',
					handler: data => {

					console.log(data.supplyItem + data.amount);
						this.supplyItems.push({supplyItem: data.supplyItem,
						amount: data.amount});
					}
				}
			]
		});
		prompt.present();
	}

}
