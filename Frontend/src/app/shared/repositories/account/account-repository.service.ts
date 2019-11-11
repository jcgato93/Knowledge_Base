import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordDto } from './models/change-password.dto';

@Injectable()
export class AccountRepositoryService {

  private url = environment.host +'/accounts';

    constructor(private http:HttpClient){
        
    }

    changePassword(model:ChangePasswordDto){
      return this.http.post(this.url+'/changepassword',model)
    }
}
