import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { PrismjsService } from '../../material-module/prismjs.service';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit,AfterViewInit {
  
  title = 'text-editor';
  @ViewChild("texteditor",null) textEditor:EditorComponent;
  
  @Input() dataModel:string = "";
  @Input() height:number = 300;
  @Output() dataModelChange = new EventEmitter<string>();

  @Output() onSaveContent = new EventEmitter<string>();
  

  constructor(private http:HttpClient,
    private prismjsService:PrismjsService) {
    
   }

  ngOnInit() {
    this.initEditor();       
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      //this.textEditor.editor.contentDocument.body.innerHTML = this.dataModel;  
      this.textEditor.writeValue(this.dataModel)
    }); 
  }

  ngAfterViewChecked() {
    // give color to code examples
    this.prismjsService.highlightAll();
  }


  onChange(event){    
    this.dataModelChange.emit(event.event.level.content)
  }

  onSave(event){    
    this.dataModel = event.event.content;

    this.onSaveContent.emit(this.dataModel);
  }


  getContent(){
    return this.textEditor.editor.contentDocument.body.innerHTML;
  }

  private initEditor(){
    this.textEditor.init = {
      base_url: '/tinymce',
      suffix: '.min',      
      language_url : '../../../../assets/language/es.js',
      language: 'es',
      plugins: [
        'image imagetools',
        'advlist autolink link image lists charmap print preview hr anchor pagebreak ',//spellchecker
        'searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking',
        'save table directionality emoticons paste codesample '        
      ],
      codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'PHP', value: 'php'},
        {text: 'Ruby', value: 'ruby'},
        {text: 'Python', value: 'python'},
        {text: 'Java', value: 'java'},
        {text: 'C', value: 'c'},
        {text: 'C#', value: 'csharp'},
        {text: 'C++', value: 'cpp'}
      ],
      toolbar: 'undo redo | insertfile | styleselect | bold italic | removeformat alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',      
      image_advtab: true,
      imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
      templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
      ],
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ],
      //width: 900,
      height: this.height,
      image_uploadtab: true,
      images_upload_url: environment.host+'/values',
      images_upload_base_path: '/assets/images',
     
      
      images_upload_handler:(blobInfo, success, failure) =>{
        const formData = new FormData();
        
        formData.append(blobInfo.name(), blobInfo.blob(),blobInfo.filename());
    
        const uploadReq = new HttpRequest('POST', `${environment.host}/assets`, formData);
    
        
        this.http.request(uploadReq).subscribe(event => {                 
          if (event.type === HttpEventType.UploadProgress){
            //this.progress = Math.round(100 * event.loaded / event.total);
          }
          else if (event.type === HttpEventType.Response){              
              let item:any = event.body
              if(!!item.location){
                  let location  = `${environment.host}/${item.location}` 
                  success(location);
              }else{
                failure("Error al intentar cargar el recurso")
              }
          }
        }
        // ,error=>{
        //   failure('Error: ' + error);
		    //   return;
        // }
        );
      }
    }
  }

}
