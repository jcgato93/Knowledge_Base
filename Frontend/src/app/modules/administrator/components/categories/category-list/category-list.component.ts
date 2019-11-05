import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CategoryView } from 'src/app/shared/repositories/category/models/category.view';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { RoutesFrontEnum } from 'src/app/shared/utils/front-routes';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  filterFC:FormControl = new FormControl();

  isLoadingResults:boolean = true;
  categoryList:Array<CategoryView> = new Array<CategoryView>();

  currentRow:any;
  

  dataSource:CategoryView[] = [];
  displayedColumns: string[] = ['name','actions'];  

  currentPage: number = null;
  pageSize: number = 9;


  categoryObservable$:Subscription;
  paginatorChange$: Subscription;

  constructor(private categoryService:CategoriesService,
    private router:Router,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar) { }

  ngOnInit() {
    
    this.getCategoryPagination();
    this.paginatorChange();
    
  }

  private getCategoryPagination(page=0,search=''){
    if(this.currentPage == null || page > this.currentPage )
    {           
      this.getCategories(page,search)
    }
    else{
      this.isLoadingResults = false;
      this.dataSource = []
      let pushData = this.categoryList.slice((page*this.pageSize),(page*this.pageSize)+this.pageSize)
      this.dataSource.push(...pushData)
    }   
   
  }



  private getCategories(page=0,search=''){
    
    this.isLoadingResults = true;
    this.currentPage = page;
    
    this.categoryObservable$ = this.categoryService.getCategories(page,search)
    .subscribe(data=>{
      setTimeout(() => {          
        this.isLoadingResults = false;                  
        this.categoryList.push(...data)
        this.dataSource = []
        let pushData = this.categoryList.slice((page*this.pageSize),(page*this.pageSize)+this.pageSize)
        this.dataSource.push(...pushData)  
      }, 1000);      
    });
  }

  private paginatorChange(){
    this.paginatorChange$ = this.paginator.page.subscribe((page)=>{
      this.getCategoryPagination(page.pageIndex)
    })
  }

  filter(event){     
    if (event.key === "Enter") {
        this.dataSource = []
        this.currentPage = null;
        this.categoryList = [];
        this.getCategories(0,this.filterFC.value)      
    }
  }

  onCreate(){
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '300px',      
    });

    dialogRef.afterClosed().subscribe(result => {     
      if(result){
        this.resetData()
      }
    });
  }

  onEdit(element:CategoryView){
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '300px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {     
      if(result){
        this.resetData()
      }
    });
  }

  onDelete(element:CategoryView){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {title:"Confirmación",content:"La categoría sera borrada y todas las historias que esten asignadas a esta quedarán sin categoría, desea continuar ?."}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.categoryService.delete(element.idCategory)
        .subscribe(data=>{
          this._snackBar.open("Borrado", "Ok")
          this.resetData()
        })
      }
    });
  }



  private resetData(){
    this.currentPage = null;
    this.categoryList=[];
    this.getCategoryPagination();
  }

}
