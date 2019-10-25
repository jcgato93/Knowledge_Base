import { Component, OnInit } from '@angular/core';
import { PostView } from 'src/app/shared/repositories/post/models/post.view';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  postView:PostView = new PostView();
  isLoading:boolean = true;
  postId:string = null
  constructor(private route:ActivatedRoute,
    private postService:PostsService,
    private router:Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {

    this.route.paramMap.subscribe(params=>{
      this.postId = params.get('id');
      if(!!this.postId){
        this.postService.getPostById(this.postId)
        .subscribe(data=>{
          setTimeout(() => {
            this.postView = data
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
      data: {title:"Confirmación",content:"La historia será borrada, desea continuar ?."}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.postService.delete(this.postId)
        .subscribe(data=>{
          this._snackBar.open("Historia borrada", "Ok")
          this.forward()
        })
      }
    });
  }

  onEdit(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_POST_EDIT,this.postId])
  }

  onForward(){
    this.forward()
  }

  private forward(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_POST_LIST])
  }

}
