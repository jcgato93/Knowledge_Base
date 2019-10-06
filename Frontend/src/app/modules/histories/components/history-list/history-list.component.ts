import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, throttleTime} from 'rxjs/operators';
import { PostView } from '../../models/post.view';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
    
  theEnd = false;
  offset = new BehaviorSubject(null);
    

  posts:PostView[] = []
  pageNumber: number = 0;

  constructor(private postService:PostsService) {

    this.offset
    .pipe(
      throttleTime(500)
    ).subscribe(
      data=>{        
        this.getBatch().subscribe(post=>{               
          this.posts.push(...post)
          this.pageNumber = this.pageNumber + 1
        })
      }
    ) 
  
  }

  ngOnInit() {
  }

  
  onScroll(event){
    const element:HTMLDivElement = event.target;
    if(element.scrollHeight - element.scrollTop < 600 && !this.theEnd){
      this.offset.next(null)
    }
    
  }

  
  getBatch(){    
    return this.postService.getPost(this.pageNumber)
    .pipe(
      tap(arr=> (arr.length ? null : (this.theEnd = true)))      
    )    
  }
  
}
