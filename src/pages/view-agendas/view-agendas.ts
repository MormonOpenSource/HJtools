import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewAgendasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-agendas',
  templateUrl: 'view-agendas.html',
})
export class ViewAgendasPage {
  
  private agenda;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.agenda = this.navParams.get('agenda');
  }  

}
