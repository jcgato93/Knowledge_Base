import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostView } from '../../../shared/repositories/post/models/post.view';
import { PostRepositoryService } from 'src/app/shared/repositories/post/post-repository.service';

@Injectable()
export class PostsService {
    
    constructor(private postRepository:PostRepositoryService){

    }

    getPosts(page:number = 0,search:string =""):Observable<PostView[]>{
        return this.postRepository.getAll(page,search)
    }

    getPostById(postId:string):Observable<PostView>{        
        return this.postRepository.getById(postId)
    }
}