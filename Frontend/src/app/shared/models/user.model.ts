import { RoleEnum } from '../enums/role.enum';

export class User{    
    email: string;
    token: string;
    expiration: Date;
    role: RoleEnum;
}