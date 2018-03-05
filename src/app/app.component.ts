import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth'
import { TabsPage } from './../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private fire: AngularFireAuth,
    private storage: Storage) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        // validate if user session is still active or not
        const unsubscribe = this.fire.auth.onAuthStateChanged(user => {
          if (!user) {
            this.rootPage = LoginPage;
            unsubscribe();
          } else {
            this.rootPage = TabsPage;
            unsubscribe();
          }
        });
    });
  }

  logout() {
    this.fire.auth.signOut().then(() => {
      this.storage.remove('userData');
      this.rootPage = LoginPage;
      window.location.reload();
    }).catch((e) => {
      console.error(e)
    })
  }
}
