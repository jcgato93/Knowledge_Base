import { Injectable } from '@angular/core';
import { CategoryRepositoryService } from 'src/app/shared/repositories/category/category-repository.service';
import { Observable } from 'rxjs';
import { CategoryCreateDto } from 'src/app/shared/repositories/category/models/category.create';
import { CategoryEditDto } from 'src/app/shared/repositories/category/models/category.edit';
import { CategoryView } from 'src/app/shared/repositories/category/models/category.view';

@Injectable()
export class CategoriesService {

    constructor(private categoryRepository:CategoryRepositoryService){

    }

    create(model:CategoryCreateDto):Observable<any>{
        return this.categoryRepository.create(model)
    }

    update(id:string,model:CategoryEditDto):Observable<any>{
        return this.categoryRepository.update(id,model)
    }

    delete(id:string):Observable<any>{
        return this.categoryRepository.delete(id)
    }

    getCategories(page:number = 0,search=""):Observable<CategoryView[]>{
        let pageSize=10;
        return this.categoryRepository.getAll(page,pageSize,search)
    }

    getCategoryById(id:string):Observable<CategoryView>{    
        return this.categoryRepository.getById(id)
    }

    
}