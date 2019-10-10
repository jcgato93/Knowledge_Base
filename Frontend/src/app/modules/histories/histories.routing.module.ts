import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HistoriesComponent } from './histories.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
    { path: '',component:HistoriesComponent,
        children:[
            { path: '', redirectTo: RoutesFrontEnum.HISTORIES_LIST, pathMatch: 'full' },
            { path: RoutesFrontEnum.HISTORIES_CONTENT + '/:id', component: ContentComponent },
            { path: RoutesFrontEnum.HISTORIES_LIST, component: HistoryListComponent },
        ]
    }
    // { path: '', component: HomeComponent },
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
export class HistoriesRoutingModule {}
