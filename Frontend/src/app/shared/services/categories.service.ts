import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryRepositoryService } from '../repositories/category/category-repository.service';
import { CategoryView } from '../repositories/category/models/category.view';

@Injectable()
export class CategoriesService {    

    constructor(private categoryRepository:CategoryRepositoryService){

    }

    /**
     * Get all categories
     * @param page 
     * @param pageSize 
     */
    getCategories(page:number=0,pageSize=50):Observable<CategoryView[]>{
        return this.categoryRepository.getAll(page,pageSize)
    }
}