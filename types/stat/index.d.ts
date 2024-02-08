declare interface UserStat {
    userId: number // 作者ID
    totalArticles: number // 总文章数
    totalViews: number // 文章总阅读数
    totalCollects: number // 总获收藏数
    totalLikes: number // 总获赞数
    totalComments: number // 总获评论数
    totalFollowers: number // 总粉丝数
    totalFollowings: number // 总关注数
}

declare interface ArticleStat {
    articleId: number // 文章ID
    views: number // 阅读数
    likes: number // 点赞数
    comments: number // 评论数
    collects: number // 收藏数
}