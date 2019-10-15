import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../models/user-login.dto';
import { map } from "rxjs/operators";
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { AuthHelper } from 'src/app/shared/utils/auth.helper';

@Injectable()
export class AccountsService {


    private url = environment.host +'/accounts'

    constructor(private http:HttpClient){

    }

    /**
     * Do Login
     * @param userLogin 
     */
    login(userLogin:UserLoginDto):Observable<User>{
        userLogin.confirmPassword = userLogin.password;

        return this.http.post<User>(this.url+'/login',userLogin).pipe(
            map(data=> {            
            let user:User = null
            if(data && data.token){
                
                user={
                    email:userLogin.email,
                    token: data.token,
                    expiration: data.expiration,
                    role : data.role
                  }
                  AuthHelper.setCurrentUser(user); 
            }              
              return user;
            })
        )
    }

    createAccount(){

    }

    changePassword(){

    }
    
}