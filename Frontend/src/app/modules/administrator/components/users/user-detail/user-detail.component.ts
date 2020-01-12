import { Component, OnInit } from '@angular/core';
import { UserView } from 'src/app/shared/repositories/account/models/user.view';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userView:UserView = new UserView();
  isLoading:boolean = true;
  userId:string = null
  constructor(private route:ActivatedRoute,
    private userService:UserService,
    private router:Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {

    this.route.paramMap.subscribe(params=>{
      this.userId = params.get('id');
      if(!!this.userId){
        this.userService.getUserById(this.userId)
        .subscribe(data=>{
          setTimeout(() => {
            this.userView = data
            this.isLoading = false;  
          }, 500);         
          
        })
      }else{
        this.forward()
      }
    })
  }

  ngOnInit() {
  }  

  onDelete(){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {title:"Confirmación",content:"El usuario será "+(this.userView.isEnabled)?"Inhabilitado":"Habilitado" +", desea continuar ?."}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // this.userService.delete(this.userId)
        // .subscribe(data=>{
        //   this._snackBar.open("Borrado", "Ok")
        //   this.forward()
        // })
      }
    });
  }

  onEdit(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_USER_EDIT,this.userId])
  }

  onForward(){
    this.forward()
  }

  private forward(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_USER_LIST])
  }

}
