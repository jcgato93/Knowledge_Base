import { Injectable } from '@angular/core';
import { PostCreateDto } from '../../../../../shared/repositories/post/models/post.create.dto';
import { Observable, of } from 'rxjs';
import { PostRepositoryService } from 'src/app/shared/repositories/post/post-repository.service';
import { PostView } from 'src/app/shared/repositories/post/models/post.view';
import { PostEditDto } from 'src/app/shared/repositories/post/models/post.edit.dto';

@Injectable()
export class PostsService {
        
    constructor(private postReposiroty:PostRepositoryService){
        
    }

    /**
     * Create a new Post
     * @param postCreate 
     */
    create(postCreate:PostCreateDto):Observable<any>{
        return this.postReposiroty.create(postCreate)
    }

    update(idPost:string,postEdit:PostEditDto):Observable<any>{
        return this.postReposiroty.update(idPost,postEdit)
    }

    delete(idPost:string):Observable<any>{
        return this.postReposiroty.delete(idPost)
    }

    getPosts(page:number = 0,search=""):Observable<PostView[]>{
        return this.postReposiroty.getAll(page,search)
    }

    getPostById(postId:string):Observable<PostView>{    
        return this.postReposiroty.getById(postId)
    }

  
}