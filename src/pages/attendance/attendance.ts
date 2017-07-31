import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { NewEntriesPage } from '../new-entries/new-entries';

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

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
  }

  newEntry() {
      this.modalCtrl.create(NewEntriesPage).present();
  }

}
