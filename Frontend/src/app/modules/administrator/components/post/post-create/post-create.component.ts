import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';
import { CategoryView } from 'src/app/shared/models/category.view';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';

import * as _ from 'lodash'
import { MatButton, MatSnackBar } from '@angular/material';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { PostCreateDto } from '../models/post-create.dto';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  @ViewChild('textEditor',null) textEditor:TextEditorComponent;
  @ViewChild('saveButton',{static: false}) saveButtonRef:  MatButton;
  postCreateDto:PostCreateDto = new PostCreateDto();

  categories:CategoryView[]= []

  form:FormGroup = this.fb.group({
    title: ['',Validators.required],
    category: ['',Validators.required],
  })
  
  keyWordField:FormControl = new FormControl('',Validators.required)   

  constructor(public fb:FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public categoriesService:CategoriesService,
    public postService:PostsService) {
      this.postCreateDto.content = ""
    }

  ngOnInit() {
    this.init()
  }

  init(){
    this.categoriesService.getCategories()
      .subscribe(data=>{
        this.categories = data;
      })
  }

  onSave(){
    if(this.form.valid){
      this.postCreateDto.title = this.form.get('title').value;
      this.postCreateDto.categoriesId.push(this.form.get('category').value)

      
      if(this.textEditor.getContent() == ''){
        this._snackBar.open("El articulo aun no tiene un contenido",'ok')
        return
      }

      this.postCreateDto.content = this.textEditor.getContent();

      if(this.postCreateDto.keyWords.length == 0){
        this._snackBar.open("Se debe registrar por lo menos una etiqueta",'ok')
        return
      }
      this.postCreateDto.keyWords;

      debugger
      this.postService.create(this.postCreateDto).subscribe(
        data=>{
          this._snackBar.open("Se creó correctamente",'ok')
        }
      )

    }    
  }

  onCancel(){
    this.router.navigate(['/'+RoutesFrontEnum.HISTORIES])
  }

  onDataModelChanged(event){
    // debugger
    // this.postCreate.content = event;
  }

  validateData(){

  }

  onAddKeyWord(){
    let keyWord = this.keyWordField.value;
    this.postCreateDto.keyWords.push(keyWord);
    
    setTimeout(() => {
        this.saveButtonRef._elementRef.nativeElement.focus();
        
        this.keyWordField.reset()
        this.keyWordField.markAsUntouched()
        this.keyWordField.clearValidators()    
    });
  }

  onRemoveKeyWord(item){
    _.remove(this.postCreateDto.keyWords,(word)=>{
      return word == item;
    }) 
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.onAddKeyWord()
    }
  }
  
}
