import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategoriesService } from '../services/categories.service';
import { CategoryCreateDto } from 'src/app/shared/repositories/category/models/category.create';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm:FormControl = new FormControl('',Validators.required);
  isSubmit:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService:CategoriesService,
    private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onCreate(){
    if(this.categoryForm.valid && !this.isSubmit){
      this.isSubmit = true;
      let dto:CategoryCreateDto = {name: this.categoryForm.value};
      this.categoryService.create(dto)
      .subscribe(data=>{
        this.isSubmit = false;
        this._snackBar.open('Creado', 'Ok');
        this.dialogRef.close(true);
      },error=>{        
        if(!!error.error.errors && !!error.error.errors.Name[0] && error.error.errors.Name[0] =='The Category Exist'){
          this._snackBar.open('La categoría ya existe', 'Ok');
        }else{
          this._snackBar.open('Se presento un error, Por favor intente de nuevo', 'Ok');  
        }
        
        this.isSubmit = false;
      });
    }
  }

}
