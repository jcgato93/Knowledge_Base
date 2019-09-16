import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  
  title = 'text-editor';
  @ViewChild("texteditor",null) textEditor:EditorComponent;
  
  @Input() dataModel:string = "";

  @Output() onSaveContent = new EventEmitter<string>();
  

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.initEditor();

    this.textEditor.editor.contentDocument.body.innerHTML = this.dataModel;
  }


  onSave(event){
    // Para Guardar desde utilizando el EditorComponent , en contenido esta en el siguiente elemento
    //console.log(this.textEditor.editor.contentDocument.body.innerHTML)
    this.dataModel = event.event.content;

    this.onSaveContent.emit(this.dataModel);
  }

  private initEditor(){
    this.textEditor.init = {
      base_url: './tinymce',
      suffix: '.min',      
      language_url : '../../../../assets/language/es.js',
      language: 'es',
      plugins: [
        'image imagetools',
        'advlist autolink link image lists charmap print preview hr anchor pagebreak ',//spellchecker
        'searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking',
        'save table directionality emoticons paste codesample '        
      ],
      toolbar: 'undo redo | save | insertfile | styleselect | bold italic | removeformat alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',      
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
      width: 900,
      height: 500,
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
                failure("Error when try to Upload image")
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
