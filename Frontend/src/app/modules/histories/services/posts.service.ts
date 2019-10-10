import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostView } from '../models/post.view';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {

    private url = environment.host +'/posts';

    constructor(private http:HttpClient){

    }

    getPosts(page:number = 0):Observable<PostView[]>{
        let params:HttpParams = new HttpParams()
        .set('page',page.toString());             

        return this.http.get<PostView[]>(this.url,{params:params})
    }

    getPostById(postId:string):Observable<PostView>{        
        return this.http.get<PostView>(this.url+'/'+postId)
    }
}