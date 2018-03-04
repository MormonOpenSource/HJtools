import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var user = this.fire.auth.currentUser;
    if (user) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

  async login(user: UserLogin) {
    try {
      const result = await this.fire.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(TabsPage);
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

}
