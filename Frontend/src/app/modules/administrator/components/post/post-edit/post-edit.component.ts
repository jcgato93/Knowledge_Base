import { Component, OnInit, ViewChild } from '@angular/core';
import { TextEditorComponent } from 'src/app/shared/components/text-editor/text-editor.component';
import { MatButton, MatSnackBar } from '@angular/material';
import { PostEditDto } from 'src/app/shared/repositories/post/models/post.edit.dto';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { PostsService } from '../services/posts.service';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import * as _ from 'lodash';
import { CategoryView } from 'src/app/shared/repositories/category/models/category.view';
@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  @ViewChild('textEditor',{static: true}) textEditor:TextEditorComponent;
  @ViewChild('saveButton',{static: true}) saveButtonRef:  MatButton;
  postEditDto:PostEditDto = new PostEditDto();

  categories:CategoryView[]= []

  form:FormGroup = this.fb.group({
    title: ['',Validators.required],
    description:['',[Validators.required,Validators.maxLength(500),Validators.required]],
    category: ['',Validators.required]
  })
  
  keyWordField:FormControl = new FormControl('',Validators.required)   
  isSubmit: any;
  postId:string = null;
  showCreateCategory:boolean = false;

  constructor(public fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    public categoriesService:CategoriesService,
    public postService:PostsService) {
      
      this.route.paramMap.subscribe(params=>{
        this.postId = params.get('id');
        
      })
    }

  ngOnInit() {
    this.init()
  }

  init(){
    this.categoriesService.getCategories()
      .subscribe(data=>{
        this.categories = data;
        if(this.categories.length == 0){
          this.showCreateCategory = true;
        }
      })


      if(!!this.postId){
        this.postService.getPostById(this.postId)
        .subscribe(data=>{            
            this.form.get('title').setValue(data.title);
            this.postEditDto.keyWords = data.keyWords;
            this.form.get('description').setValue(data.description);
            this.textEditor.setContent(data.content);
            this.form.get('category').setValue((data.categories.length > 0)?data.categories[0].idCategory:'')            
        })
      }else{
        this.forward()
      }
  }

  onSave(){    
    if(this.form.valid && !this.isSubmit){
      this.isSubmit = true;

      this.postEditDto.title = this.form.get('title').value;
      this.postEditDto.categoriesId.push(this.form.get('category').value)
      this.postEditDto.description =  this.form.get('description').value;      

      
      if(this.textEditor.getContent() == ''){
        this._snackBar.open("El articulo aun no tiene un contenido",'ok')
        this.isSubmit = false;
        return
      }

      this.postEditDto.content = this.textEditor.getContent();

      if(this.postEditDto.keyWords.length == 0){
        this._snackBar.open("Se debe registrar por lo menos una etiqueta",'ok')
        this.isSubmit = false;
        return
      }
      this.postEditDto.keyWords;

      
      this.postService.update(this.postId,this.postEditDto).subscribe(
        data=>{
          this._snackBar.open("Editado",'Ok')
          this.isSubmit = false;
          this.forward();
        }
      )

    }    
  }

  onCancel(){
    this.forward()
  }

  onDataModelChanged(event){
    // debugger
    // this.postCreate.content = event;
  }

  validateData(){

  }

  onAddKeyWord(){
    let keyWord = this.keyWordField.value;
    this.postEditDto.keyWords.push(keyWord);
    
    setTimeout(() => {
        this.saveButtonRef._elementRef.nativeElement.focus();
        
        this.keyWordField.reset()
        this.keyWordField.markAsUntouched()
        this.keyWordField.clearValidators()    
    });
  }

  onRemoveKeyWord(item){
    _.remove(this.postEditDto.keyWords,(word)=>{
      return word == item;
    }) 
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.onAddKeyWord()
    }
  }

  onCreateCategory(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_CATEGORY_LIST])
  }

  forward(){
    this.router.navigate([RoutesFrontEnum.ADMIN+'/'+RoutesFrontEnum.ADMIN_POST_DETAIL,this.postId])
  }
}
