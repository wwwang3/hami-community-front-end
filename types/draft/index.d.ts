
declare type ArticleState = 0 | 1

/**
 * 文章草稿信息
 */
declare interface ArticleDraft {
    id: number // 草稿ID
    articleId: number // 文章ID
    userId: number // 作者ID
    categoryId: number // 分类ID
    tagIds: Array<number> // 标签ID
    title: string // 标题
    summary: string // 简介
    content: string //内容
    picture: string // 图片
    state: ArticleState // 状态
    deleted?: number
    version?: number
    ctime: number // 创建时间
    mtime: number // 修改时间
}

declare interface ArticleDraftParam {
    id: number // 草稿ID
    categoryId: number // 分类ID
    tagIds: Array<number> // 标签ID
    title: string // 标题
    summary: string // 简介
    content: string //内容
    picture: string // 图片
}