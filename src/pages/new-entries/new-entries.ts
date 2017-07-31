import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { NewAttendancePage } from '../new-attendance/new-attendance';
import { NewAgendaPage } from '../new-agenda/new-agenda';

/**
 * Generated class for the NewEntriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-entries',
  templateUrl: 'new-entries.html',
})
export class NewEntriesPage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
  }

  onDismiss(){
    this.viewCtrl.dismiss();
  }

  newAttendance(){
    this.navCtrl.push(NewAttendancePage);
  }

  newAgenda(){
    this.navCtrl.push(NewAgendaPage); 
  }

}
