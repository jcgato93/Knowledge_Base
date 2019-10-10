import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostView } from '../../models/post.view';
import { PostsService } from '../../services/posts.service';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  postView:PostView = new PostView();
  isLoading:boolean = true;

  constructor(private route:ActivatedRoute,
    private postService:PostsService,
    private router:Router) {

    this.route.paramMap.subscribe(params=>{
      let postId = params.get('id');
      if(!!postId){
        this.postService.getPostById(postId)
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


  onForward(){
    this.forward()
  }

  private forward(){
    this.router.navigate([RoutesFrontEnum.HISTORIES+'/'+RoutesFrontEnum.HISTORIES_LIST])
  }
}
