import { User } from '../models/user.model';

export class AuthHelper{

    private static currentUser:User = null;

    public static setCurrentUser(user:User){
        this.currentUser = user;
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    public static getCurrentUser(){
        return this.currentUser;
    }

    public static logout(){
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}