import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategoryEditDto } from 'src/app/shared/repositories/category/models/category.edit';
import { CategoriesService } from '../services/categories.service';
import { CategoryView } from 'src/app/shared/repositories/category/models/category.view';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  categoryForm:FormControl = new FormControl('',Validators.required);
  isSubmit:boolean = false;
  idCategory:string = null;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryView,
    private categoryService:CategoriesService,
    private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.idCategory = this.data.idCategory;
    this.categoryForm.setValue(this.data.name)
    if(this.idCategory == null){
      this.dialogRef.close();
    }
  }

  onEdit(){
    if(this.categoryForm.valid && !this.isSubmit){
      this.isSubmit = true;
      let dto:CategoryEditDto = {name: this.categoryForm.value};
      this.categoryService.update(this.idCategory,dto)
      .subscribe(data=>{
        this.isSubmit = false;
        this._snackBar.open('Editado', 'Ok');
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
