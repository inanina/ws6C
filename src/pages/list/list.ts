import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  item;
  supplyItems: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public db: AngularFireDatabase) {
      this.item = navParams.get("item");
	  //console.log(this.item);
      //this.supplyItems = this.db.list('/items/supplyItems');
	  this.supplyItems = this.db.list('/items/' + this.item.$key + '/supplyItems')
  }

  addItem(itemId){
		let prompt = this.alertCtrl.create({
			title: 'Hinzufügen',
			inputs: [
				{
					name: 'supplyItem',
          			placeholder: 'Name',
					  type: 'text'
				},
				{
					name: 'amount',
					placeholder: 'Anzahl',
					type: 'number'
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
						this.supplyItems.push({
							supplyItem: data.supplyItem,
							supplyAmount: data.amount,
							supplyState: false,
							respPerson: ''
						});
					}
				}
			]
		});
		prompt.present();
	}

	updateItem(supplyId, supplyItem, supplyAmount, respPerson) {
		let prompt = this.alertCtrl.create({
			title: supplyItem,
			message: 'Ich brings mit!',
			inputs: [
				{
					name: 'name',
					placeholder: supplyItem,
					value: supplyItem,
					 type: 'text'
				},
				{
					name: 'amount',
					placeholder: supplyAmount,
					value: supplyAmount,
					type: 'number'
				},
				{
					name: 'respPerson',
					placeholder: "Name",
					value: respPerson,
					 type: 'text'
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
						this.supplyItems.update(supplyId, {
							supplyItem: data.name,
							supplyAmount: data.amount,
							respPerson: data.respPerson,
							supplyState: true
						});

					}
				}
			]
		});
		prompt.present();
	}

	updateState(supplyId, supplyState) {
			this.supplyItems.update(supplyId, {supplyState: supplyState} );
	}

	removeItem(itemId: string){
		this.supplyItems.remove(itemId);
	}

}
