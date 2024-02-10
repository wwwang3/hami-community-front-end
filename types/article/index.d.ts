
// article-api

declare interface Category {
    id: number // 分类ID
    name: string // 分类名称
    path?: string // 路径
}

declare interface Tag {
    id: number // 标签ID
    name: string // 分类名称
    type?: number // 类型
}

declare interface ArticleInfo {
    id: number // 文章ID
    userId: number // 作者ID
    categoryId: number // 分类ID
    tagIds: Array<number> // 标签ID列表
    title: string // 标题
    summary: string // 简介
    content?: string // 文章内容
    picture: string // 封面
    ctime: number // 创建时间
    mtime: number // 修改时间
    deleted: 0 | 1 // 是否删除
}

declare interface Article {
    id: number // 文章ID
    userId: number // 作者ID
    articleInfo: ArticleInfo // 文章基本信息
    author: Author // 作者信息
    category: Category // 分类信息
    tags: Tag[] // 标签列表
    stat: ArticleStat // 文章数据
    liked: boolean // 当前登录用户是否点赞该文章
    collected: boolean // 当前登录用户是否收藏该文章
}

declare type SearchParam = PageParam & {
    keyword?: string
    type?: number
}

declare type ArticleParam = PageParam & {
    cateId?: number
}

declare type UserArticleParam = PageParam & {
    userId: number
}