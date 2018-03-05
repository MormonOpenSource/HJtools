import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AgendasPage } from '../agendas/agendas';

/**
 * Generated class for the UpdateAgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-agenda',
  templateUrl: 'update-agenda.html',
})
export class UpdateAgendaPage {
  private agenda: FormGroup;
  private agendas: AngularFireList<any>;
  private agendaSelected;

  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private db: AngularFireDatabase) {

    this.agendas = db.list('agendas');
    this.agendaSelected = this.navParams.get('agenda');
    this.agenda = this.formBuilder.group({
      tipoAgenda: [this.agendaSelected.tipoAgenda, Validators.required],
      preside: [this.agendaSelected.preside, Validators.required],
      fecha: [this.agendaSelected.fecha, Validators.required],
      dirige: [this.agendaSelected.dirige, Validators.required],
      asuntos: [this.agendaSelected.asuntos],
      deberes: this.formBuilder.group({
        nombre: [this.agendaSelected.deberes.nombre, Validators.required],
        resumen: [this.agendaSelected.deberes.resumen]
      }),
      experiencia: this.formBuilder.group({
        nombre: [this.agendaSelected.experiencia.nombre, Validators.required],
        resumen: [this.agendaSelected.experiencia.resumen]
      }),
      tituloClase: [this.agendaSelected.tituloClase, Validators.required],
      clase: this.formBuilder.group({
        nombre: [this.agendaSelected.clase.nombre, Validators.required],
        resumen: [this.agendaSelected.clase.resumen]
      }),
      ultimaOracion: [this.agendaSelected.ultimaOracion, Validators.required]
    });   
  }

  updateAgenda():void {
    this.agendas.update(this.agendaSelected.key, this.agenda.value)
    this.navCtrl.pop();
  }

}
