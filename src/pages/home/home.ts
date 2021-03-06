import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ListPage } from '../list/list';
import { DatePicker } from '@ionic-native/date-picker';
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
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  addItem(){
		let prompt = this.alertCtrl.create({
			title: 'Neues Event',
			inputs: [
				{
					name: 'name',
          placeholder: 'Name'
				},
        {
          name: 'description',
          placeholder: 'Beschreibung'
        },
				{
					name: 'date',
					placeholder: 'Datum'
				},
				{
					name: 'startTime',
					placeholder: 'Start Zeit'
				},
				{
					name: 'endTime',
					placeholder: 'Ende'
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
						if(data.name != ''){
							if(data.description == '') {
								data.description == '';
							}
							this.items.push({
							name: data.name,
              description: data.description,
							date: data.date,
							startTime: data.startTime,
							endTime: data.endTime
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
	updateItem(itemId, itemTitle, itemDescription, itemDate, itemStartDate, itemEndDate){
		let prompt = this.alertCtrl.create({
			title: itemTitle,
			message: 'Event anpassen',
			inputs: [
				{
					name: 'name',
					placeholder: 'Name',
					value: itemTitle,
					type: 'number'
				},
				{
					name: 'description',
					placeholder: 'Beschreibung',
					value: itemDescription,
					type: 'text'
				},
				{
					name: 'date',
					placeholder: 'Datum',
					value: itemDate,
					type: 'date'

				},
				{
					name: 'startTime',
					placeholder: 'Start Zeit',
					value: itemStartDate
				},
				{
					name: 'endTime',
					placeholder: 'Ende',
					value: itemEndDate
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
						this.items.update(itemId, {
							name: data.name,
              description: data.description,
							date: data.date,
							startTime: data.startTime,
							endTime: data.endTime
						});
					}
				}
			]
		});
		prompt.present();
	}

}
  
