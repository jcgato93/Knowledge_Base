import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { MaterialModule } from './material-module/material.module';

import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EditorModule  
  ],
  exports:[
    TextEditorComponent   
  ]
})
export class SharedModule { }
