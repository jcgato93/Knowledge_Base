import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryCreateDto } from './models/category.create';
import { CategoryEditDto } from './models/category.edit';
import { CategoryView } from './models/category.view';

@Injectable()
export class CategoryRepositoryService {

    private url = environment.host +'/categories';

    constructor(private http:HttpClient){

    }

    create(model:CategoryCreateDto):Observable<any>{
        return this.http.post(this.url,model)
    }

    update(id:string,model:CategoryEditDto):Observable<any>{
        return this.http.put(this.url+'/'+id,model)
    }

    delete(id:string){
        return this.http.delete(this.url+'/'+id)
    }

    getAll(page:number = 0,pageSize= 10,search=""):Observable<CategoryView[]>{
        let params:HttpParams = new HttpParams()
        .set('page',page.toString())
        .set('pageSize',pageSize.toString())
        .set('search',search);    

        return this.http.get<CategoryView[]>(this.url,{params:params})
    }

    getById(id:string):Observable<CategoryView>{        
        return this.http.get<CategoryView>(this.url+'/'+id)
    }


}