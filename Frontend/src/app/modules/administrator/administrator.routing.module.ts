import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministratorComponent } from './administrator.component';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';



const routes: Routes = [
    { path: '', 
      component: AdministratorComponent,
      children:[
          { path: '', redirectTo: RoutesFrontEnum.ADMIN_POST_LIST, pathMatch: 'full'},

          // Post
          { path: RoutesFrontEnum.ADMIN_POST_LIST, component: PostListComponent },
          { path: RoutesFrontEnum.ADMIN_POST_CREATE, component: PostCreateComponent },
          { path: RoutesFrontEnum.ADMIN_POST_DETAIL+'/:id', component: PostDetailComponent },
          { path: RoutesFrontEnum.ADMIN_POST_EDIT+'/:id', component: PostEditComponent },
          
          // Category
          { path: RoutesFrontEnum.ADMIN_CATEGORY_LIST, component: CategoryListComponent },

          // Profile
          { path: RoutesFrontEnum.ADMIN_PROFILE, component: ProfileDetailComponent },

          // USERS
          { path: RoutesFrontEnum.ADMIN_USER_LIST, component: UserListComponent },
          { path: RoutesFrontEnum.ADMIN_USER_DETAIL+'/:id', component: UserDetailComponent },
          { path: RoutesFrontEnum.ADMIN_USER_EDIT+'/:id', component: UserEditComponent },
          { path: RoutesFrontEnum.ADMIN_USER_CREATE, component: UserCreateComponent },
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
