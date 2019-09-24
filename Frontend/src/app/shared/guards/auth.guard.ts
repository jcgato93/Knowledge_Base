import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelper } from '../utils/auth.helper';
import { User } from '../models/user.model';
import { RoutesFrontEnum } from '../utils/front-routes';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,   
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser:User = AuthHelper.getCurrentUser();
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate([RoutesFrontEnum.Auth+'/'+RoutesFrontEnum.Auth_Login], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
