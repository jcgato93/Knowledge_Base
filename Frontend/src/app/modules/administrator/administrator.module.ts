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



@NgModule({
  declarations: [
      AdministratorComponent,
     PostCreateComponent,
     PostListComponent,
     PostDetailComponent,
     PostEditComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule
  ],
  providers:[
    PostsService
  ]
})
export class AdministratorModule { }
