import { Injectable } from '@angular/core';
import { ChangePasswordDto } from 'src/app/shared/repositories/account/models/change-password.dto';
import { AccountRepositoryService } from 'src/app/shared/repositories/account/account-repository.service';


@Injectable()
export class ProfileService {

    constructor(private accountRepository:AccountRepositoryService){

    }

    changePassword(model:ChangePasswordDto){
        return this.accountRepository.changePassword(model)
    }
    
}