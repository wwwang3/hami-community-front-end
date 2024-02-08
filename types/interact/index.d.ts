
declare interface ReadingRecord {
    id: number // 阅读记录ID
    userId: number // 用户ID
    articleId: number // 文章ID
    readingTime: number // 阅读时间
    content: Article // 文章内容
}

declare type LikeType = 1 | 2

declare interface LikeItemParam {
    itemId: number // 点赞实体ID
    itemType: LikeType // 点赞实体类型
}

declare interface DailyDataGrowing {
    article_incr?: number // 文章数量增长
    view_incr?: number // 阅读数量增长
    like_incr?: number // 点赞数增长
    comment_incr?: number // 评论数增长
    collect_incr?: number // 收藏数增长
    follower_incr?: number // 粉丝数增长
    cancel_follow_incr?: number // 取消关注数增长(掉粉数)
}