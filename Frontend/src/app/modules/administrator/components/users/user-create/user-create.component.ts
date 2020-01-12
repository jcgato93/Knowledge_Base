import { Component, OnInit } from '@angular/core';
import { UserCreateDto } from 'src/app/shared/repositories/account/models/user-create.dto';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RoleView } from 'src/app/shared/repositories/role/models/role.view';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserService } from '../services/user.service';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateDto:UserCreateDto = new UserCreateDto();

  roles:RoleView[]= []

  form:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    roleId: ['',Validators.required]
  })
    
  isSubmit: any;  

  constructor(public fb:FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public rolesService:RolesService,
    public userService:UserService) {
      
    }

  ngOnInit() {
    this.init()
  }

  init(){
    this.rolesService.getRoles()
      .subscribe(data=>{        
        this.roles = data;        
      })
  }

  onSave(){    
    if(this.form.valid && !this.isSubmit){
      this.isSubmit = true;
      
      Object.assign(this.userCreateDto,this.form.getRawValue());      
      this.userCreateDto.confirmpassword = this.userCreateDto.password;
      
      this.userService.create(this.userCreateDto).subscribe(
        data=>{
          this._snackBar.open("Creado",'Ok')
          this.isSubmit = false;
          this.forward();
        }
      )

    }    
  }

  onCancel(){
    this.forward();
  }

  
  forward(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_USER_LIST])
  }
}
