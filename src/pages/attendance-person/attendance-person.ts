import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AttendancePersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-attendance-person',
  templateUrl: 'attendance-person.html',
})
export class AttendancePersonPage {
  private person: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.person = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      oficio: ['', Validators.required]
    })
  }

  onDismiss(): void {
    this.viewCtrl.dismiss();
  }

  savePerson(): void {
    this.viewCtrl.dismiss(this.person.value);
  }

}
