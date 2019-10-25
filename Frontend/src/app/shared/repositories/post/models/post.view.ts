import { CategoryView } from 'src/app/shared/models/category.view';

export class PostView{
    idPost:string;
    title: string;
    description: string;
    content: string;
    keyWords: Array<string>;
    categories: Array<CategoryView>;
    authorId: string;
    authorUserName: string;
    createdAt: Date;

    constructor(){
        this.keyWords = [];
        this.categories = [];
    }
}