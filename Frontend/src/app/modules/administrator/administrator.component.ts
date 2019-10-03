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

  constructor() { }

  ngOnInit() {
  }

}
