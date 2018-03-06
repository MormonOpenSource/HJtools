import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { NewAttendancePage } from '../new-attendance/new-attendance';
import { NewAgendaPage } from '../new-agenda/new-agenda';
import { ViewAttendancePage } from '../view-attendance/view-attendance';
import { PermissionsPage } from './../permissions/permissions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AttendancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  private attendanceItems: AngularFireList<any>;
  private attendance: Observable<any>
  private filteredItems: Array<any>;
  private searchTerm: String;
  private userInstanceData: any;
  loading

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.createLoader();
    this.loading.present().then(() => {
      // get user data from localstorage
      storage.get('userData').then((user) => {
        this.userInstanceData = JSON.parse(user);
      });

      this.attendanceItems = db.list('/attendance');
      this.attendance = this.attendanceItems.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
        .map((attendance) => {
          return attendance.reverse();
        })

      this.searchTerm = '';
      this.getFilteredItems();
      this.loading.dismiss();
    });
  }

  newEntry() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar nueva',
      buttons: [
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
        }, {
          text: 'Asignar permisos',
          handler: () => {
            this.navCtrl.push(PermissionsPage);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  validatePermissions(): boolean {
    let rolesAllowed = ['obispo', 'lider', 'presidente']
    return rolesAllowed.indexOf(this.userInstanceData.role) > -1;
  }

  createLoader(message: string = "Por favor espera...") { // Optional Parameter
    this.loading = this.loadingCtrl.create({
      content: message
    });
  }

  attendanceSelected(attendance): void {
    this.navCtrl.push(ViewAttendancePage, {
      attendance: attendance
    });
  }

  deleteattendance(agendaId): void {
    let alert = this.alertCtrl.create({
      title: 'Eliminar asistencia',
      message: '¿Estas seguro que quieres eliminar esta asistencia?',
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
            this.attendanceItems.remove(agendaId);
          }
        }
      ]
    })
    alert.present()
  }

  getFilteredItems() {
    let seachTerm = this.searchTerm
    // use subscribe and foreach for filtering
    this.attendance.forEach((_items: any) => {
      this.filteredItems = [];
      _items.forEach(item => {
        if (item.date && item.typeMetting) {
          let validDate = item.date.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          let validTypeMetting = item.typeMetting.toLowerCase().indexOf(seachTerm.toLowerCase()) > -1;
          if (validDate || validTypeMetting)
            this.filteredItems.push(item);
        }
      })
    });
  }

}

