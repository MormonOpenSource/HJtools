import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AgendasPage } from '../agendas/agendas';

/**
 * Generated class for the NewAgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-agenda',
  templateUrl: 'new-agenda.html',
})
export class NewAgendaPage {
  private agenda: FormGroup;
  private newAgenda: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private db: AngularFireDatabase) {
    this.newAgenda = db.list('/agendas');  
    this.agenda = this.formBuilder.group({
      preside: ['', Validators.required],
      fecha: ['', Validators.required],
      dirige: ['', Validators.required],
      asuntos: [''],
      deberes: this.formBuilder.group({
        nombre: ['', Validators.required],
        resumen: ['']
      }),
      experiencia: this.formBuilder.group({
        nombre: ['', Validators.required],
        resumen: ['']
      }),
      tituloClase: ['', Validators.required],
      clase: this.formBuilder.group({
        nombre: ['', Validators.required],
        resumen: ['']
      }),
      ultimaOracion: ['', Validators.required]
    });  
  }

  saveAgenda():void {
    this.agenda.value.ward = 'federman';
    this.newAgenda.push(this.agenda.value);
    this.navCtrl.push(AgendasPage);
  }
}
