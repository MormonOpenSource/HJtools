import { Component } from '@angular/core';

import { AgendasPage } from '../agendas/agendas';
import { AttendancePage } from '../attendance/attendance';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AgendasPage;
  tab2Root = AttendancePage;

  constructor() {

  }
}
