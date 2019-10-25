export class PostEditDto{
    title: string
    description: string
    content: string
    keyWords: string[]
    categoriesId: string[]

    constructor(){
        this.title = null
        this.content = ""
        this.description = null
        this.keyWords = []
        this.categoriesId = []
    }
}