export class PostCreateDto {

    title: string
    content: string
    keyWords: string[]
    categoriesId: string[]

    constructor(){
        this.title = null
        this.content = ""
        this.keyWords = []
        this.categoriesId = []
    }
}