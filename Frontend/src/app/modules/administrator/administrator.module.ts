import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator.routing.module';
import { AdministratorComponent } from './administrator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostsService } from './components/post/services/posts.service';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { CategoriesService } from './components/categories/services/categories.service';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { ResetPasswordComponent } from './components/profile/reset-password/reset-password.component';
import { ProfileService } from './components/profile/services/profile.service';



@NgModule({
  declarations: [
      AdministratorComponent,
     PostCreateComponent,
     PostListComponent,
     PostDetailComponent,
     PostEditComponent,
     CategoryListComponent,
     CategoryCreateComponent,
     CategoryEditComponent,
     ProfileDetailComponent,
     ResetPasswordComponent     
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule
  ],
  providers:[
    PostsService,
    CategoriesService,
    ProfileService
  ],
  entryComponents:[
    CategoryCreateComponent,
     CategoryEditComponent,
     ResetPasswordComponent
  ]
})
export class AdministratorModule { }
