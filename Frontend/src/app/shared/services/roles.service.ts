import { Injectable } from '@angular/core';
import { RoleRepositoryService } from '../repositories/role/role-repository.service';
import { Observable } from 'rxjs';
import { RoleView } from '../repositories/role/models/role.view';

@Injectable()
export class RolesService {

    constructor(private roleRepository:RoleRepositoryService){

    }

    getRoles():Observable<RoleView[]>{
       return this.roleRepository.getAll();
    }
}