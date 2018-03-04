import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NewAttendancePage } from '../new-attendance/new-attendance';
import { NewAgendaPage } from '../new-agenda/new-agenda';
import { ViewAttendancePage } from '../view-attendance/view-attendance';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AttendancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  private attendance: FirebaseListObservable<any>
  private filteredItems: Array<any>;
  private searchTerm: String;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController) {

    this.attendance = db.list('/attendance').map((agendas) => {
      return agendas.reverse();
    }) as FirebaseListObservable<any>;

    this.searchTerm = '';
    this.getFilteredItems();
  }

  newEntry() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar nueva',
      buttons: [
        {
          text: 'Agenda',
          handler: () => {
            this.navCtrl.push(NewAgendaPage); 
          }
        }, {
          text: 'Asistencia',
          handler: () => {
            this.navCtrl.push(NewAttendancePage);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }

  attendanceSelected(attendance): void {
    this.navCtrl.push(ViewAttendancePage, {
      attendance: attendance
    });
  }

  getFilteredItems() {
    let seachTerm = this.searchTerm
    // use subscribe and foreach for filtering
    this.attendance.subscribe((_items) => {
      this.filteredItems = [];
      _items.forEach(item => {
        if (item.date && item.typeMetting) {
          let validDate = item.date.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          let validTypeMetting = item.typeMetting.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          if (validDate || validTypeMetting)
            this.filteredItems.push(item);
        }
      })
    });
  }

}

