import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the PermissionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-permissions',
  templateUrl: 'permissions.html',
})
export class PermissionsPage {

  private permForm: FormGroup;
  private users: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder) {

      this.users = db.list('/users');
      this.permForm = this.formBuilder.group({
        uid: ['', Validators.required],
        role: ['', Validators.required]
      });
  }

  ionViewDidLoad() {}
  
  changeRole() {

  }

}
