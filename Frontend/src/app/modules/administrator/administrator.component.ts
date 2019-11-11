import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { User } from 'src/app/shared/models/user.model';
import { AuthHelper } from 'src/app/shared/utils/auth.helper';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { Router } from '@angular/router';


export interface IOptionMenu{

  description:string;
  icon:string;
  route:string;
  roles:string[];
}

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  @ViewChild(MatSidenav,null) sidenav: MatSidenav;
  opened: boolean = true;
  showSidenav:boolean = true;

  user:User =new User();

  listSidenav:IOptionMenu[] = [
    { description: 'Historias', icon: 'subject', route: RoutesFrontEnum.ADMIN+'/'+ RoutesFrontEnum.ADMIN_POST_LIST, roles:['All'] },
    { description: 'Perfil', icon: 'fingerprint', route: RoutesFrontEnum.ADMIN+'/'+ RoutesFrontEnum.ADMIN_PROFILE, roles:['All'] },
    // { description: 'Usuarios', icon: 'supervisor_account', route: RoutesFrontEnum.ADMIN+'/', roles:[RoleEnum.Admin] },
    { description: 'Categorias', icon: 'category', route: RoutesFrontEnum.ADMIN+'/'+ RoutesFrontEnum.ADMIN_CATEGORY_LIST, roles:[RoleEnum.Admin] },
    // { description: 'Grupos', icon: 'view_module', route: '', roles:[RoleEnum.Admin] },

    { description: 'Atras', icon: 'arrow_back', route: RoutesFrontEnum.HISTORIES+'/'+ RoutesFrontEnum.HISTORIES_LIST, roles:['All'] },
    
  ]

  constructor(private router:Router) { 
    this.user = AuthHelper.getCurrentUser();
  }

  ngOnInit() {

    
  }

  get role(){
    return RoleEnum;
  }
}
