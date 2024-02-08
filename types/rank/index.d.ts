
declare interface HotArticle {
    articleId: number // 文章Id
    hotRank: number // 热度
    article: Article // 文章
}

declare interface HotAuthor {
    authorId: number // 作者Id
    hotIndex: number // 热度
    author: Author // 作者
}