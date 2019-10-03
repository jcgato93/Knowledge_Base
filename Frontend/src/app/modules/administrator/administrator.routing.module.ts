import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministratorComponent } from './administrator.component';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { PostCreateComponent } from './components/post/post-create/post-create.component';



const routes: Routes = [
    { path: '', 
      component: AdministratorComponent,
      children:[
          { path: '', redirectTo: RoutesFrontEnum.ADMIN_POST_CREATE, pathMatch: 'full'},
          { path: RoutesFrontEnum.ADMIN_POST_CREATE, component: PostCreateComponent }
      ]
    }
    
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
export class AdministratorRoutingModule {}
