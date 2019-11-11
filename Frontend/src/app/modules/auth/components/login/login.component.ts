import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLoginDto } from '../../models/user-login.dto';
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',Validators.required]
  })

  isSubmit:boolean = false;

  constructor(private fb:FormBuilder,
    private accountService:AccountsService,
    private router:Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(){    
    if(this.form.valid){
      this.isSubmit = true; 
      let userLogin:UserLoginDto = {
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        confirmPassword:this.form.get('password').value
      }

      
      this.accountService.login(userLogin).subscribe(
        user=>{          
          this.router.navigate([RoutesFrontEnum.HISTORIES])
      },error=>{
        this.isSubmit = false;
        this._snackBar.open("Email o password incorrecto",'ok')
      });
      
    }
  }

}
