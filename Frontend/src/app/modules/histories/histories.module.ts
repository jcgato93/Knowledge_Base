import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriesRoutingModule } from './histories.routing.module';
import { HistoriesComponent } from './histories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { PostsService } from './services/posts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';



@NgModule({
  declarations: [HistoriesComponent, HistoryListComponent, ContentComponent],
  imports: [
    CommonModule,    
    HistoriesRoutingModule,
    SharedModule
  ],
  providers:[
    PostsService
  ]
})
export class HistoriesModule { }
