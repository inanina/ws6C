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
			title: 'Anpassen',
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
					text: 'Abbrechen',
					handler: data => {
					}
				},
				{
					text: 'Speichern',
					handler: data => {
						console.log(data.supplyItem + data.amount);
						this.supplyItems.push({
							supplyItem: data.supplyItem,
							supplyAmount: data.amount,
							supplyState: false
						});
					}
				}
			]
		});
		prompt.present();
	}

	updateItem(supplyId, supplyItem, supplyAmount) {
		let prompt = this.alertCtrl.create({
			title: supplyItem,
			message: 'Anpassen',
			inputs: [
				{
					name: 'name',
					placeholder: supplyItem,
					value: supplyItem
				},
				{
					name: 'amount',
					placeholder: supplyAmount,
					value: supplyAmount
				}
			],
			buttons: [
				{
					text: 'Abbrechen',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Speichern',
					handler: data => {
						console.log(supplyId);
						this.supplyItems.update(supplyId, {
							supplyItem: data.supplyItem,
							amount: data.supplyAmount
						});
					}
				}
			]
		});
		prompt.present();
	}

	updateState(supplyId, supplyState) {
		//implement
	}

	removeItem(itemId: string){
		this.supplyItems.remove(itemId);
	}

}
