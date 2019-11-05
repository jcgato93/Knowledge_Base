import { User } from '../models/user.model';

export class AuthHelper{

    private static currentUser:User = null;

    public static setCurrentUser(user:User){
        
        if (user && user.token) {

            this.currentUser = user;
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    public static getCurrentUser():User{
        if(this.currentUser == null){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        }
        return this.currentUser;
    }

    public static logout(){
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}