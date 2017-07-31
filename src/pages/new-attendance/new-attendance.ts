import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs'
import { AttendancePersonPage } from '../attendance-person/attendance-person';

/**
 * Generated class for the NewAttendancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-attendance',
  templateUrl: 'new-attendance.html',
})
export class NewAttendancePage {
  private attendance: FormGroup;
  private newAttendance: FirebaseListObservable<any>;
  private listAttendance:Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private modalCtrl: ModalController) {
    
    this.newAttendance = db.list('/attendance'); 
    this.attendance = this.formBuilder.group({
      date: ['', Validators.required],
      typeMetting: ['clasedomingo', Validators.required],
    });

    this.listAttendance = [];
  }

  addPerson(): void {
    let addPerson = this.modalCtrl.create(AttendancePersonPage);
    addPerson.onDidDismiss((person) => {
      if (person) {
        this.listAttendance.push(person);
      }      
    })
    addPerson.present();
  }

  submitAttendance(): void {
    let attendance = {
      date: '',
      typeMetting: '',
      people: []
    };
    attendance.date = this.attendance.value.date;
    attendance.typeMetting = this.attendance.value.typeMetting;
    attendance.people = this.listAttendance;
    
    this.newAttendance.push(attendance);
    this.navCtrl.push(TabsPage);
  }

  deletePerson(key): void {
    this.listAttendance.splice(key, 1);
  }

}
