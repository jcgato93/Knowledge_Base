export enum RoutesFrontEnum{

    //#region Auth
    AUTH = 'auth',
    AUTH_LOGIN = 'login',
    //#endregion

    //#region Administrator
    ADMIN  = 'administrator',
    ADMIN_POST_LIST = 'post/list',
    ADMIN_POST_CREATE = 'post/create',
    ADMIN_POST_DETAIL = 'post/detail', //+ :id
    ADMIN_POST_EDIT = 'post/edit', //+ :id


    ADMIN_CATEGORY_LIST = 'category/list',

    ADMIN_PROFILE = 'profile',

    //#endregion


    //#region  Histories
    HISTORIES = 'histories',
    HISTORIES_LIST= 'list',
    HISTORIES_CONTENT = 'content' //+:id
    //#endregion

}