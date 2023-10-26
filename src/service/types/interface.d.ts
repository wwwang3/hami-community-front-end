declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>

    logout(): Promise<any>,

    getCaptcha(type: "register" | "reset" | "update", email: string): Promise<any>,

    register(param: RegisterParam): Promise<any>

    resetPassword(param: ResetPassParam): Promise<any>

    updatePassword(params: ResetPassParam): Promise<any>

    getLoginProfile(): Promise<LoginProfile>

}

declare interface UserServiceApi {

    getUserProfile(): Promise<UserProfile>

    getAuthorInfo(user_id: number): Promise<User>

    updateUserProfile(params: UserProfileParam): Promise<any>

    updateAvatar(avatar: File): Promise<string>

    getAccountInfo(): Promise<AccountInfo>

    getLoginRecords(param: PageParam): Promise<PageData<LoginRecord>>
}

declare interface ArticleDraftServiceApi {

    getArticles(pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>>

    getDrafts(pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>>

    getArticleDraft(id: number): Promise<ArticleDraftDetail>

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

declare interface UserInteractApi {

    follow(followingId: number): Promise<any>

    unfollow(followingId: number): Promise<any>

    like(param: LikeItemParam): Promise<any>

    cancelLike(param: LikeItemParam): Promise<any>

    collect(articleId: number): Promise<any>

    cancelCollect(articleId: number): Promise<any>

    listCollectArticles(param: UserArticleParam): Promise<PageData<Article>>

    listUserLikeArticle(param: UserArticleParam): Promise<PageData<Article>>

    listUserFollowing(param: UserArticleParam): Promise<PageData<User>>

    listUserFollower(param: UserArticleParam): Promise<PageData<User>>

    getUserDataGrowing(): Promise<DailyDataGrowing>

}

declare interface CommentServiceApi {
    listComment(param: CommentPageParam): Promise<PageData<CommentInfo>>

    listReply(param: CommentPageParam): Promise<PageData<CommentInfo>>

    publishComment(param: CommentParam, reply: boolean = false): Promise<Comment>

    submitComment(param: CommentParam): Promise<Comment>

    submitReply(param: CommentParam): Promise<Comment>

    deleteComment(id: number): Promise<any>
}

declare interface ImageServiceApi {
    upload(image: File, type: "comment" | "avatar" | "article"): Promise<string>
}

declare interface NotifyServiceApi {

    queryCommentNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    queryLikeCollectNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    queryFollowNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    queryNotify(notify_type: "comment" | "like_collect" | "follow", param: PageParam): Promise<PageData<NotifyMsg>>

    getNoReadCount(): Promise<NotifyCount>

    deleteNotify(msg_id: number)

    doRead(msg_id: number)

}

declare interface ReadingRecordServiceApi {

    listReadingRecord(param: SearchParam): Promise<PageData<ReadingRecord>>

    deleteReadingRecord(record_id: number)

    clearReadingRecords()

}

declare interface SearchServiceApi {

    searchArticle(param: SearchParam): Promise<PageData<Article>>

    getHotSearchList(): Promise<Array<string>>
}