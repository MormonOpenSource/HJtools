import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AgendasPage } from '../pages/agendas/agendas';
import { AttendancePage } from '../pages/attendance/attendance';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewAttendancePage } from '../pages/new-attendance/new-attendance';
import { NewAgendaPage } from '../pages/new-agenda/new-agenda';
import { ViewAgendasPage } from '../pages/view-agendas/view-agendas';
import { UpdateAgendaPage } from '../pages/update-agenda/update-agenda'
import { AttendancePersonPage } from '../pages/attendance-person/attendance-person'
import { ViewAttendancePage } from '../pages/view-attendance/view-attendance';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { PermissionsPage } from './../pages/permissions/permissions';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';

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
    ReversePipe,
    ViewAttendancePage,
    LoginPage,
    RegisterPage,
    PermissionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    AttendancePersonPage,
    ViewAttendancePage,
    LoginPage,
    RegisterPage,
    PermissionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
