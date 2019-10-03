import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { MaterialModule } from './material-module/material.module';

import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from './guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoriesService } from './services/categories.service';
import { ToastComponent } from './components/toast/toast.component';


@NgModule({
  declarations: [
    TextEditorComponent,
    MainContainerComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    EditorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

  ],
  exports:[
    TextEditorComponent,
    MaterialModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    MainContainerComponent,
    FlexLayoutModule
  ],
  providers:[
    AuthGuard,
    CategoriesService
  ]
})
export class SharedModule { }
