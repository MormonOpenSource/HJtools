import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { NewEntriesPage } from '../new-entries/new-entries';
import { ViewAgendasPage } from '../view-agendas/view-agendas';
import { UpdateAgendaPage } from '../update-agenda/update-agenda'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';


/**
 * Generated class for the AgendasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-agendas',
  templateUrl: 'agendas.html',
})
export class AgendasPage {

  private agendas: FirebaseListObservable<any>

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController) {

    this.agendas = db.list('/agendas').map((agendas) => { 
      return agendas.reverse(); 
    }) as FirebaseListObservable<any>;
  }

  newEntry(): void {
    this.modalCtrl.create(NewEntriesPage).present();
  }

  agendaSelected(agenda): void {
    this.navCtrl.push(ViewAgendasPage, {
      agenda: agenda
    });
  }

  deleteAgenda(agendaId): void {
    let alert = this.alertCtrl.create({
      title: 'Eliminar agenda',
      message: '¿Estas seguro que quieres eliminar esta agenda?',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'eliminar',
          handler: () =>{
            this.agendas.remove(agendaId);
          }
        }
      ]
    })
    alert.present()
  }

  editAgenda(agenda): void {
    this.navCtrl.push(UpdateAgendaPage, {
      agenda: agenda
    })
  }


}
