import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthHelper } from '../utils/auth.helper';
import { User } from '../models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       // add authorization header with jwt token if available
       let currentUser:User = AuthHelper.getCurrentUser();
       if (currentUser && currentUser.token) {
           req = req.clone({
               setHeaders: { 
                   Authorization: `Bearer ${currentUser.token}`
               }
           });
       }

       return next.handle(req);
    }
}