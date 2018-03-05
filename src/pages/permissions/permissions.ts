import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
  private usersQuery: AngularFireList<any>;
  private users: Observable<any[]>;
  private userSelected: any;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder) {

      this.usersQuery = db.list('/users');
      this.users = this.usersQuery.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      this.permForm = this.formBuilder.group({
        uid: ['', Validators.required],
        role: ['', Validators.required],
        stake: ['', Validators.required],
        ward: ['', Validators.required]
      });
  }

  ionViewDidLoad() {}

  onChangeUser(uid) {
    this.users.forEach((users:any) =>{
      users.forEach(user => {
        if(user.uid === uid) {
          this.userSelected = user;
          this.permForm.controls.role.setValue(user.role);
          this.permForm.controls.stake.setValue(user.stake)
          this.permForm.controls.ward.setValue(user.ward)
          return;
        }
      });
    })
  }
  
  changeRole() {
    this.usersQuery.update(this.userSelected.key, this.permForm.value)
    this.navCtrl.pop();
  }

}
