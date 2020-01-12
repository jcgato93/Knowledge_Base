import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoleView } from './models/role.view';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleRepositoryService {

    private url = environment.host +'/roles';

    constructor(private http:HttpClient){

    }

    getAll():Observable<RoleView[]>{    
        return this.http.get<RoleView[]>(this.url)
    }
}