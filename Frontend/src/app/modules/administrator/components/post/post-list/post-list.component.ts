import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PostView } from 'src/app/shared/repositories/post/models/post.view';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'] 
})
export class PostListComponent implements OnInit, OnDestroy {

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  filterFC:FormControl = new FormControl();

  isLoadingResults:boolean = true;
  postList:Array<PostView> = new Array<PostView>();

  currentRow:any;
  

  dataSource:PostView[] = [];
  displayedColumns: string[] = ['title','category', 'autor', 'lastUpdate','actions'];
  expandedElement: PostView | null;

  currentPage: number = null;
  pageSize: number = 9;


  postObservable$:Subscription;
  paginatorChange$: Subscription;

  constructor(private postService:PostsService,
    private router:Router) { }

  ngOnInit() {
    
    this.getPostPagination();
    this.paginatorChange();
    
  }

  private getPostPagination(page=0,search=''){
    if(this.currentPage == null || page > this.currentPage )
    {           
      this.getPost(page,search)
    }
    else{
      this.isLoadingResults = false;
      this.dataSource = []
      let pushData = this.postList.slice((page*this.pageSize),(page*this.pageSize)+this.pageSize)
      this.dataSource.push(...pushData)
    }   
   
  }


  /**
   * only use in getPostFilter
   * @param page 
   * @param search 
   */
  private getPost(page=0,search=''){
    
    this.isLoadingResults = true;
    this.currentPage = page;
    
    this.postObservable$ = this.postService.getPosts(page,search)
    .subscribe(data=>{
      setTimeout(() => {          
        this.isLoadingResults = false;                  
        this.postList.push(...data)
        this.dataSource = []
        let pushData = this.postList.slice((page*this.pageSize),(page*this.pageSize)+this.pageSize)
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
        this.postList = [];
        this.getPost(0,this.filterFC.value)      
    }
  }

  onCreate(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_POST_CREATE])
  }

  onDetail(post:PostView){    
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_POST_DETAIL,post.idPost])
  }


  ngOnDestroy(): void {
    this.postObservable$.unsubscribe();
    this.paginatorChange$.unsubscribe();
  }

}
