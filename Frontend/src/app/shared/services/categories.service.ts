import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryView } from '../models/category.view';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoriesService {

    private url = environment.host +'/categories'

    constructor(private http:HttpClient){

    }

    /**
     * Get all categories
     * @param page 
     * @param pageSize 
     */
    getCategories(page:number=0,pageSize=50):Observable<CategoryView[]>{
        let params:HttpParams = new HttpParams()
            .set("page",page.toString())
            .set("pageSize",pageSize.toString())

        return this.http.get<CategoryView[]>(this.url,{params:params})
    }
}