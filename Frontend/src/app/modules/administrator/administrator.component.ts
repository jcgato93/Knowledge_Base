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
    { description: 'Historias', icon: 'subject', route: RoutesFrontEnum.ADMIN_POST_LIST, roles:['All'] },
    { description: 'Perfil', icon: 'fingerprint', route: '', roles:['All'] },
    { description: 'Usuarios', icon: 'supervisor_account', route: '', roles:[RoleEnum.Admin] },
    { description: 'Categorias', icon: 'category', route: RoutesFrontEnum.ADMIN_CATEGORY_LIST, roles:[RoleEnum.Admin] },
    { description: 'Grupos', icon: 'view_module', route: '', roles:[RoleEnum.Admin] },

    { description: 'Web', icon: 'language', route: '', roles:['All'] },
    { description: 'Salir', icon: 'power_settings_new', route: '', roles:['All'] }
  ]

  constructor(private router:Router) { 
    this.user = AuthHelper.getCurrentUser();
  }

  ngOnInit() {

    
  }


  onSelectOption(option:IOptionMenu){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+option.route])
  }

  get role(){
    return RoleEnum;
  }
}
