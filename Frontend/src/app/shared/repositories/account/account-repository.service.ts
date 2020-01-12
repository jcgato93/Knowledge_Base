import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangePasswordDto } from './models/change-password.dto';
import { UserView } from './models/user.view';
import { Observable } from 'rxjs';
import { UserCreateDto } from './models/user-create.dto';

@Injectable()
export class AccountRepositoryService {

  private url = environment.host +'/accounts';

    constructor(private http:HttpClient){
        
    }

    changePassword(model:ChangePasswordDto){
      return this.http.post(this.url+'/changepassword',model)
    }

    create(model:UserCreateDto):Observable<any>{
      return this.http.post(this.url+'/create',model)
    }
    

    // delete(idPost:string){
    //     return this.http.delete(this.url+'/'+idPost)
    // }

    getAll(page:number = 0,search=""):Observable<UserView[]>{
        let params:HttpParams = new HttpParams()
        .set('page',page.toString())
        .set('search',search);    

        return this.http.get<UserView[]>(this.url,{params:params})
    }

    getById(id:string):Observable<UserView>{        
        return this.http.get<UserView>(this.url+'/'+id)
    }
}
