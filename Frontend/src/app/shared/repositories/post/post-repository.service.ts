import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostView } from './models/post.view';
import { PostCreateDto } from './models/post.create.dto';
import { PostEditDto } from './models/post.edit.dto';

@Injectable()
export class PostRepositoryService {
    private url = environment.host +'/posts';

    constructor(private http:HttpClient){

    }


     /**
     * Create a new Post
     * @param postCreate 
     */
    create(postCreate:PostCreateDto):Observable<any>{
        return this.http.post(this.url,postCreate)
    }

    update(idPost:string,postEdit:PostEditDto):Observable<any>{
        return this.http.put(this.url+'/'+idPost,postEdit)
    }

    delete(idPost:string){
        return this.http.delete(this.url+'/'+idPost)
    }

    getPosts(page:number = 0,search=""):Observable<PostView[]>{
        let params:HttpParams = new HttpParams()
        .set('page',page.toString())
        .set('search',search);    

        return this.http.get<PostView[]>(this.url,{params:params})
    }

    getPostById(postId:string):Observable<PostView>{        
        return this.http.get<PostView>(this.url+'/'+postId)
    }
}