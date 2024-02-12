declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>

    logout(): Promise<any>,

    getCaptcha(param: CaptchaSendParam): Promise<any>,

    register(param: RegisterParam): Promise<any>

    resetPassword(param: ResetPassParam): Promise<any>

    updatePassword(params: ResetPassParam): Promise<any>

}

declare interface AccountServiceApi {

    getLoginProfile(): Promise<LoginProfile>

    getLoginProfile(): Promise<LoginProfile>

    getAccountInfo(): Promise<AccountInfo>

    listLoginRecord(param: PageParam): Promise<PageData<LoginRecord>>

    updateUserProfile(params: UserProfileParam): Promise<any>
}

declare interface UserServiceApi {

    getAuthorInfo(userId: number): Promise<User>

}

declare interface CategoryServiceApi {
    getAllCategory(): Promise<Array<Category>>
}

declare interface TagServiceApi {
    listTag(param: PageParam): Promise<PageData<Tag>>

    getAllTag(): Promise<Array<Tag>>
}

declare interface ArticleServiceApi {

    listNewestArticle(param: ArticleParam): Promise<PageData<Article>>

    listFollowUserArticle(param: PageParam): Promise<PageData<Article>>

    getArticleContent(id: number): Promise<Article>

    listUserArticles(param: UserArticleParam): Promise<PageData<Article>>

}

declare interface ArticleDraftServiceApi {

    listArticle(page: PageParam): Promise<PageData<ArticleDraft>>

    listDraft(page: PageParam): Promise<PageData<ArticleDraft>>

    getArticleDraft(id: number): Promise<ArticleDraft>

    createDraft(param: ArticleDraftParam): Promise<ArticleDraft>

    updateDraft(param: ArticleDraftParam): Promise<ArticleDraft>

    publishArticle(draftId: number): Promise<ArticleDraft>

    deleteDraft(id: number): Promise<any>

    deleteArticle(id: number): Promise<any>
}

declare interface UserInteractApi {

    follow(followingId: number): Promise<any>

    unfollow(followingId: number): Promise<any>

    like(param: LikeItemParam): Promise<any>

    cancelLike(param: LikeItemParam): Promise<any>

    collect(articleId: number): Promise<any>

    cancelCollect(articleId: number): Promise<any>

    listCollectArticle(param: UserArticleParam): Promise<PageData<Article>>

    listUserLikeArticle(param: UserArticleParam): Promise<PageData<Article>>

    listUserFollowing(param: UserArticleParam): Promise<PageData<User>>

    listUserFollower(param: UserArticleParam): Promise<PageData<User>>

    getUserDataGrowing(): Promise<DailyDataGrowing>

}

declare interface CommentServiceApi {
    listComment(param: CommentPageParam): Promise<PageData<Comment>>

    listReply(param: CommentPageParam): Promise<PageData<Comment>>

    publishComment(param: CommentParam, reply: boolean = false): Promise<CommentInfo>

    submitComment(param: CommentParam): Promise<CommentInfo>

    submitReply(param: CommentParam): Promise<CommentInfo>

    deleteComment(id: number): Promise<any>
}

declare interface ImageServiceApi {
    upload(param: ImageUploadParam): Promise<string>
}

declare interface NotifyServiceApi {

    queryCommentNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    queryLikeCollectNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    queryFollowNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    querySystemNotify(param: PageParam): Promise<PageData<NotifyMsg>>

    queryNotify(notify_type: "reply" | "love" | "follow" | 'system', param: PageParam): Promise<PageData<NotifyMsg>>

    getNoReadCount(): Promise<NotifyCountMap>

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

declare interface RankServiceApi {
    listHotArticle(cateId: string | number | null): Promise<Array<HotArticle>>

    listHotAuthor(): Promise<Array<HotAuthor>>
}