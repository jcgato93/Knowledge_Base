import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostCreateDto } from '../models/post-create.dto';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class PostsService {

    private url = environment.host +'/posts'
    

    constructor(private http:HttpClient){
        
    }

    /**
     * Create a new Post
     * @param postCreate 
     */
    create(postCreate:PostCreateDto):Observable<any>{
        return this.http.post(this.url,postCreate)
    }

  
}