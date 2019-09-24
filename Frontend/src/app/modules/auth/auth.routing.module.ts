import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { AuthComponent } from './auth.component';



const routes: Routes = [
     { path: '', 
     component: AuthComponent,
     children:[
        { path: '', component: LoginComponent } ,
        { path: RoutesFrontEnum.Auth_Login, component: LoginComponent }
     ] 
    },
     
    // { path: 'path2', component: Name2Component },
    // { path: 'path3', component: Name3Component },
    // { path: 'path4', component: Name4Component },
    // { path: '**', component: PageNotFoundComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
