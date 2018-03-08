import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private register: FormGroup;
  private newUser: AngularFireList<any>;
  loading;

  constructor(private db: AngularFireDatabase,
    private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder) {

      this.newUser = db.list('/users');
      this.register = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        quorum: ['', Validators.required],
        stake: ['', Validators.required],
        ward: ['', Validators.required]
      });
  }

  ionViewDidLoad() { }
  createLoader(message: string = "Por favor espera...") { // Optional Parameter
    this.loading = this.loadingCtrl.create({
      content: message
    });
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  registerUser() {
    this.createLoader();
    this.loading.present().then(() => {
      this.fire.auth.createUserWithEmailAndPassword(
        this.register.value.email.trim(),
        this.register.value.password
      ).then((registeredUser) => {
        if (registeredUser) {
          this.newUser.push({
            quorum: this.register.value.quorum,
            stake: this.register.value.stake,
            ward: this.register.value.ward,
            name: this.register.value.name,
            lastName: this.register.value.lastName,
            role: 'guest',
            uid: registeredUser.uid
          });
          this.loading.dismiss();
          // Update successful.
          this.navCtrl.setRoot(TabsPage);
        }
      })
        .catch(e => {
          this.presentAlert(e.message);
          this.loading.dismiss();
        })
    })
      .catch(e => {
        this.presentAlert(e.message);
      })
  }
}
