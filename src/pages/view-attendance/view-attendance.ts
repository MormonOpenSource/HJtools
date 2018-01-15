import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewAttendancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-attendance',
  templateUrl: 'view-attendance.html',
})
export class ViewAttendancePage {

  private attendance

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.attendance = this.navParams.get('attendance'); 
  }

}
