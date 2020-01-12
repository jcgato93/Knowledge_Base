import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserView } from 'src/app/shared/repositories/account/models/user.view';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  filterFC:FormControl = new FormControl();

  isLoadingResults:boolean = true;
  userList:Array<UserView> = new Array<UserView>();

  currentRow:any;
  

  dataSource:UserView[] = [];
  displayedColumns: string[] = ['email','status', 'actions'];  

  currentPage: number = null;
  pageSize: number = 9;


  userObservable$:Subscription;
  paginatorChange$: Subscription;

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit() {
    
    this.getPostPagination();
    this.paginatorChange();
    
  }

  private getPostPagination(page=0,search=''){
    if(this.currentPage == null || page > this.currentPage )
    {           
      this.getUsers(page,search)
    }
    else{
      this.isLoadingResults = false;
      this.dataSource = []
      let pushData = this.userList.slice((page*this.pageSize),(page*this.pageSize)+this.pageSize)
      this.dataSource.push(...pushData)
    }   
   
  }

  
  private getUsers(page=0,search=''){
    
    this.isLoadingResults = true;
    this.currentPage = page;
    
    this.userObservable$ = this.userService.getUsers(page,search)
    .subscribe(data=>{
      setTimeout(() => {          
        this.isLoadingResults = false;                  
        this.userList.push(...data)
        this.dataSource = []
        let pushData = this.userList.slice((page*this.pageSize),(page*this.pageSize)+this.pageSize)
        this.dataSource.push(...pushData)  
      }, 1000);      
    });
  }

  private paginatorChange(){
    this.paginatorChange$ = this.paginator.page.subscribe((page)=>{
      this.getPostPagination(page.pageIndex)
    })
  }

  filter(event){     
    if (event.key === "Enter") {
        this.dataSource = []
        this.currentPage = null;
        this.userList = [];
        this.getUsers(0,this.filterFC.value)      
    }
  }

  onCreate(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_USER_CREATE])
  }

  onDetail(view:UserView){    
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_USER_DETAIL,view.id])
  }


  ngOnDestroy(): void {
    this.userObservable$.unsubscribe();
    this.paginatorChange$.unsubscribe();
  }


}
