
/**
 * 回复信息
 */
declare interface Reply {
    total: number // 总回复数
    list: Comment[] // 回复列表
}

/**
 * 评论信息
 */
declare interface Comment {
    id: number // 评论ID
    articleId: number // 文章ID
    userId: number // 用户ID
    replyTo: number //回复的用户ID
    rootId: number | null // 根评论ID
    parentId: number | null // 父评论ID
    content: string // 评论内容
    pictures?: string // 评论内容图片
    ipInfo: IpInfo // ip信息
    likes: number // 点赞数
    ctime: number // 评论时间
    reply?: Reply // 回复
    user: User // 评论用户
    replyUser?: User // 回复用户
    liked: boolean // 是否点赞
}

/**
 * 评论基本信息
 */
declare interface CommentInfo {
    id: number // 评论ID
    articleId: number // 文章ID
    userId: number // 用户ID
    replyTo: number //回复的用户ID
    rootId: number | null // 根评论ID
    parentId: number | null // 父评论ID
    content: string // 评论内容
    pictures?: string // 评论内容图片
    ipInfo: IpInfo // ip信息
    likes: number // 点赞数
    ctime: number // 评论时间
}

/**
 * 提交评论参数
 */
declare interface CommentParam {
    articleId: number // 文章ID
    rootId: number | null // 根评论ID
    parentId: number | null // 父评论ID
    content: string // 评论内容
    pictures?: string // 评论内容图片
}

declare type CommentPageParam = PageParam & {
    articleId: number,
    rootId?: number,
    sort?: 0 | 1
}