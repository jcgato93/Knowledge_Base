import { Component, OnInit } from '@angular/core';
import { AuthHelper } from 'src/app/shared/utils/auth.helper';
import { User } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  isLoading = false;
  user:User = new User();

  constructor(public dialog: MatDialog){
    this.user= AuthHelper.getCurrentUser();
  }

  ngOnInit() {
  }

  onChangePassword(){
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '300px',      
    });    
  }

}
