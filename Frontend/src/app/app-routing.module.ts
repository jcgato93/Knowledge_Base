import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesFrontEnum } from './shared/utils/front-routes';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [  
  { path: '', 
    component: AppComponent,
    children:[
      { path: '',  redirectTo: RoutesFrontEnum.AUTH ,pathMatch: 'full' },      
      { path: RoutesFrontEnum.AUTH, loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule) },
      { path: RoutesFrontEnum.ADMIN, canActivate: [AuthGuard],loadChildren: () => import('./modules/administrator/administrator.module').then(mod => mod.AdministratorModule) },
      { path: RoutesFrontEnum.HISTORIES, canActivate: [AuthGuard],loadChildren: () => import('./modules/histories/histories.module').then(mod => mod.HistoriesModule) },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
