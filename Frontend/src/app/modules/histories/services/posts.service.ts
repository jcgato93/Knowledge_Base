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

    getPost(page:number = 0):Observable<PostView[]>{

        let params:HttpParams = new HttpParams()
        .set('page',page.toString());             

        return this.http.get<PostView[]>(this.url,{params:params})

        // return of<PostView[]>([
        //     {
        //         AuthorId:"kasljdfkl",
        //         Categories:[
        //             {idCategory:"klasjdf",name:"categoria 1"},
        //             {idCategory:"klasajadsfdf",name:"categoria 2"}
        //         ],
        //         Content:"ajsdflñjsdklf",
        //         CreatedAt: new Date(),
        //         IdPost: "11111",
        //         KeyWords: ["test","test2"],
        //         Title: "titulo"
        //     },
        //     {
        //         AuthorId:"kasljdfkl",
        //         Categories:[
        //             {idCategory:"klasjdf",name:"categoria 1"},
        //             {idCategory:"klasajadsfdf",name:"categoria 2"}
        //         ],
        //         Content:"ajsdflñjsdklf",
        //         CreatedAt: new Date(),
        //         IdPost: "2222",
        //         KeyWords: ["test","test2"],
        //         Title: "titulo"
        //     },
        // ])
    }
}