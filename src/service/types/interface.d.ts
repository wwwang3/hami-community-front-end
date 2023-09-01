declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>

    logout(): Promise<any>,

    getCaptcha(type: "register" | "reset" | "update", email: string): Promise<any>,

    register(param: RegisterParam): Promise<any>,

    resetPassword(param: ResetPassParam): Promise<any>,

    updatePassword(params: ResetPassParam): Promise<any>
}

declare interface UserServiceApi {
    getLoginProfile(): Promise<SimpleUserInfo>

    getUserProfile(): Promise<UserProfile>

    updateUserProfile(params: UserProfileParam): Promise<any>

    updateAvatar(avatar: File): Promise<string>

    getAccountInfo(): Promise<AccountInfo>

    getLoginRecords(param: PageParam): Promise<PageData<LoginRecord>>
}

declare interface ArticleDraftServiceApi {

    getArticles(pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>>

    getDrafts(pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>>

    getArticleDraft(id: number ): Promise<ArticleDraftDetail>

    createDraft(param: ArticleDraftParam): Promise<ArticleDraft>

    updateDraft(param: ArticleDraftParam): Promise<ArticleDraft>

    publishArticle(draftId: number): Promise<ArticleDraft>

    deleteDraft(id: number): Promise<any>

    deleteArticle(id: number): Promise<any>

    uploadPicture(pic: File): Promise<string>
}

declare interface CategoryServiceApi {
    getAllCategories(): Promise<Array<Category>>
}

declare interface TagServiceApi {
    listTags(param: PageParam): Promise<PageData<Tag>>

    getAllTags(): Promise<Array<Tag>>
}