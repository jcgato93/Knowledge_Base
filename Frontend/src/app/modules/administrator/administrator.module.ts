import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator.routing.module';
import { AdministratorComponent } from './administrator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostsService } from './components/post/services/posts.service';



@NgModule({
  declarations: [
      AdministratorComponent,
     PostCreateComponent
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
