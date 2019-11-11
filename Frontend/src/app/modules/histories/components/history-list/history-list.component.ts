import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, throttleTime} from 'rxjs/operators';
import { PostView } from '../../../../shared/repositories/post/models/post.view';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
    
  theEnd = false;
  offset = new BehaviorSubject('');
  filterFC:FormControl = new FormControl('');
  urlCreateNewPost: string = RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_POST_CREATE;

  isLoadingResults: boolean = true;

  posts:PostView[] = []
  pageNumber: number = 0;

  constructor(private postService:PostsService,
    private router:Router) {

    this.offset
    .pipe(
      throttleTime(500)
    ).subscribe(
      data=>{        
        this.getBatch(this.filterFC.value).subscribe(post=>{               
          this.posts.push(...post)
          this.pageNumber = this.pageNumber + 1
          this.isLoadingResults = false;
        })
      }
    ) 
  
  }

  ngOnInit() {
    this.filterFC.valueChanges.subscribe((value)=>{
      if(value == ''){
        this.initialData();
      }
    })
  }

  private initialData(){
    this.isLoadingResults = true;
    this.pageNumber = 0;
    this.posts = [];
    this.offset.next(null)
  }

  onSelectHistory(post:PostView){
    this.router.navigate([RoutesFrontEnum.HISTORIES+'/'+RoutesFrontEnum.HISTORIES_CONTENT,post.idPost])
  }
  
  onScroll(event){
    const element:HTMLDivElement = event.target;
    if(element.scrollHeight - element.scrollTop < 600 && !this.theEnd){
      this.offset.next(null)
    }
    
  }

  
  getBatch(search = ''){
    if(search == null || search == 'null'){
      search = ''
    }
    return this.postService.getPosts(this.pageNumber,search)
    .pipe(
      tap(arr=> (arr.length ? null : (this.theEnd = true)))      
    )    
  }
  

  filter(event){     
    if (event.key === "Enter") {       
        this.initialData();
    }
  }
}
