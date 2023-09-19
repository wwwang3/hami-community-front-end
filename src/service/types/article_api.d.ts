declare interface ArticleServiceApi {

    listRecommendArticles(param: ArticleParam): Promise<PageData<Article>>

    listFollowUserUserArticles(param: PageParam): Promise<PageData<Article>>

    getArticleContent(id: number): Promise<ArticleContent>

    listHotArticles(cateId: number): Promise<Array<HotArticle>>

    listUserArticles(param: UserArticleParam): Promise<PageData<Article>>

}