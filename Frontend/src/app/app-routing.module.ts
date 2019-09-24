import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesFrontEnum } from './shared/utils/front-routes';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [  
  { path: '', 
    component: AppComponent,
    children:[
      { path: '',  redirectTo: RoutesFrontEnum.Auth ,pathMatch: 'full' },      
      { path: RoutesFrontEnum.Auth, loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule) },
      { path: RoutesFrontEnum.Administrator, canActivate: [AuthGuard],loadChildren: () => import('./modules/administrator/administrator.module').then(mod => mod.AdministratorModule) },
      { path: RoutesFrontEnum.Histories, canActivate: [AuthGuard],loadChildren: () => import('./modules/histories/histories.module').then(mod => mod.HistoriesModule) },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
