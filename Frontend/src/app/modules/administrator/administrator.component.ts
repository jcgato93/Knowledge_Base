import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  @ViewChild(MatSidenav,null) sidenav: MatSidenav;
  opened: boolean = true;
  showSidenav:boolean = true;

  listSidenav:any[] = [
    { description: 'Historias', icon: 'subject', route: '', roles:['all'] },
    { description: 'Perfil', icon: 'fingerprint', route: '', roles:['all'] },
    { description: 'Usuarios', icon: 'supervisor_account', route: '', roles:['Administrator'] },
    { description: 'Categorias', icon: 'category', route: '', roles:['Administrator'] },
    { description: 'Grupos', icon: 'view_module', route: '', roles:['Administrator'] },

    { description: 'Web', icon: 'language', route: '', roles:['all'] },
    { description: 'Salir', icon: 'power_settings_new', route: '', roles:['all'] }
  ]

  constructor() { }

  ngOnInit() {
  }

}
