import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { ViewAgendasPage } from '../view-agendas/view-agendas';
import { UpdateAgendaPage } from '../update-agenda/update-agenda'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth'
import { Storage } from '@ionic/storage';
import { NewAttendancePage } from '../new-attendance/new-attendance';
import { NewAgendaPage } from '../new-agenda/new-agenda';
import { PermissionsPage } from './../permissions/permissions';
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

  private agendasItems: AngularFireList<any>;
  private agendas: Observable<any[]>;
  private filteredItems: Array<any>;
  private searchTerm: String;
  private buttonsNewEntry: Array<any>;
  private userDataQuery: AngularFireList<any>;
  private userData: Observable<any[]>;
  private userInstanceData: any;


  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private fire: AngularFireAuth,
    private storage: Storage) {

    this.buttonsNewEntry = [
      {
        text: 'Agenda',
        handler: () => {
          this.navCtrl.push(NewAgendaPage);
        }
      }, {
        text: 'Asistencia',
        handler: () => {
          this.navCtrl.push(NewAttendancePage);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {

        }
      }      
    ]
    var user = this.fire.auth.currentUser;
    if (user) {
      this.userDataQuery = db.list('users', ref => ref.orderByChild('uid').equalTo(user.uid))
      this.userDataQuery.valueChanges().subscribe((data:any) => {
        // save user data
        this.userInstanceData = data[0];
        storage.set('userData', JSON.stringify(this.userInstanceData));
        // load list with filtering 
        this.searchTerm = '';
        this.getFilteredItems()
        // add give permissions options by role validated
        if (data[0].role == 'obispo') {
          this.buttonsNewEntry.push({
            text: 'Asignar permisos',
            handler: () => {
              this.navCtrl.push(PermissionsPage);
            }
          })
        }
      })
      
    }
    this.agendasItems = db.list('/agendas');
    this.agendas = this.agendasItems.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).map((agendas) => {
      return agendas.reverse();
    })     
  }

  validatePermissions(): boolean {
    let rolesAllowed = ['obispo', 'lider', 'presidente']
    return rolesAllowed.indexOf(this.userInstanceData.role) > -1;
  }

  newEntry(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar nueva',
      buttons: this.buttonsNewEntry
    });
    actionSheet.present();
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
          handler: () => {
            this.agendasItems.remove(agendaId);
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

  getFilteredItems() {
    let seachTerm = this.searchTerm
    // use subscribe and foreach for filtering    
    this.agendas.forEach((_items:any) => {
      this.filteredItems = [];
      _items.forEach(item => {        
        if (item.tipoAgenda) {
          let validAgendaType = item.tipoAgenda.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          let validDate = item.fecha.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          let validTitle = item.tituloClase.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          if (validAgendaType || validDate || validTitle)
            this.filteredItems.push(item);
        }
      })
    });
  }
}
