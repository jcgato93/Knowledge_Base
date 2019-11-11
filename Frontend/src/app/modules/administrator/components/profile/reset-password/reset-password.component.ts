import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ChangePasswordDto } from 'src/app/shared/repositories/account/models/change-password.dto';
import { User } from 'src/app/shared/models/user.model';
import { AuthHelper } from 'src/app/shared/utils/auth.helper';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form:FormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  isSubmit:boolean = false;
  hide = true;

  user:User = new User;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private profileService:ProfileService,
    private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = AuthHelper.getCurrentUser();
  }

  onEdit(){
    if(this.form.valid && !this.isSubmit){
      this.isSubmit = true;
      let dto:ChangePasswordDto = {email: this.user.email,newPassword:this.form.value,confirmPassword:this.form.value};
      this.profileService.changePassword(dto)
      .subscribe(data=>{
        this.isSubmit = false;
        this._snackBar.open('Editado', 'Ok');
        this.dialogRef.close(true);
      },error=>{                     
          this._snackBar.open('Se presento un error, Por favor intente de nuevo', 'Ok');        
          this.isSubmit = false;
      });
    }
  }

}
