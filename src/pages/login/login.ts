import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { UserLogin } from '../../interfaces/user-login'
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as UserLogin;
  loading;

  constructor(private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {}

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

  login(user: UserLogin) {
    this.createLoader();
    this.loading.present().then(() => {
      this.fire.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          this.loading.dismiss();
          if (result) {
            this.navCtrl.setRoot(TabsPage);
          }
        })
        .catch(e => {
          this.presentAlert(e.message);
          this.loading.dismiss();
        })
    })
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

}
