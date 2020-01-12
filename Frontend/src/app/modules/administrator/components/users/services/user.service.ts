import { Injectable } from '@angular/core';
import { AccountRepositoryService } from 'src/app/shared/repositories/account/account-repository.service';
import { UserCreateDto } from 'src/app/shared/repositories/account/models/user-create.dto';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from 'src/app/shared/repositories/account/models/change-password.dto';
import { UserView } from 'src/app/shared/repositories/account/models/user.view';

@Injectable()
export class UserService {

    constructor(private accountRepository:AccountRepositoryService){

    }

    create(model:UserCreateDto):Observable<any>{
        return this.accountRepository.create(model)
    }
   
    changePassword(model:ChangePasswordDto):Observable<any>{
        return this.accountRepository.changePassword(model)
    }

    getUsers(page:number = 0,search=""):Observable<UserView[]>{
        return this.accountRepository.getAll(page,search)
    }

    getUserById(postId:string):Observable<UserView>{    
        return this.accountRepository.getById(postId)
    }
}