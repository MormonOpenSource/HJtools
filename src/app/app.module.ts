import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AgendasPage } from '../pages/agendas/agendas';
import { AttendancePage } from '../pages/attendance/attendance';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewEntriesPage } from '../pages/new-entries/new-entries';
import { NewAttendancePage } from '../pages/new-attendance/new-attendance';
import { NewAgendaPage } from '../pages/new-agenda/new-agenda';
import { ViewAgendasPage } from '../pages/view-agendas/view-agendas';
import { UpdateAgendaPage } from '../pages/update-agenda/update-agenda'
import { AttendancePersonPage } from '../pages/attendance-person/attendance-person'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ReversePipe } from '../pipes/reverse-list.pipe'
import { ConfigSecret } from  '../config/config-secret'
import * as firebaseConfigJson from '../config/config-secret.json'

export const firebaseConfig:ConfigSecret = <any> firebaseConfigJson; 

@NgModule({
  declarations: [
    MyApp,
    AgendasPage,
    AttendancePage,
    HomePage,
    TabsPage,
    NewAttendancePage,
    NewAgendaPage,
    ViewAgendasPage,
    UpdateAgendaPage,
    AttendancePersonPage,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgendasPage,
    AttendancePage,
    HomePage,
    TabsPage,
    NewAttendancePage,
    NewAgendaPage,
    UpdateAgendaPage,
    ViewAgendasPage,
    AttendancePersonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
