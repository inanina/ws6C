import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ContactPage } from '../contact/contact';
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
    this.navCtrl.push(ContactPage, {
      item: item
    });
  }

  addItem(){
		let prompt = this.alertCtrl.create({
			title: 'Neues Grillevent',
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
					placeholder: 'Startzeit'
				},
				{
					name: 'endTime',
					placeholder: 'Endzeit'
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
			message: "Ereignis anpassen",
			inputs: [
				{
					name: 'name',
					placeholder: 'Name',
					value: itemTitle
				},
				{
					name: 'description',
					placeholder: 'Beschreibung',
					value: itemDescription
				},
				{
					name: 'date',
					placeholder: 'Datum',
					value: itemDate
				},
				{
					name: 'startTime',
					placeholder: 'Startzeit',
					value: itemStartDate
				},
				{
					name: 'endTime',
					placeholder: 'Endzeit',
					value: itemEndDate
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
  
