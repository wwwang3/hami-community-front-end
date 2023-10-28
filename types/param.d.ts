
declare interface LoginParam {
    account: string,
    password: string
}

/**
 * 注册接口参数
 */
declare interface RegisterParam {
    /**
     * 用户名
     */
    username: string
    /**
     * Miami
     */
    password: string
    /**
     * 重复密码
     */
    rePassword?: string
    /**
     * 邮箱
     */
    email: string,
    /**
     * 邮箱验证码
     */
    captcha: string
}

declare interface ResetPassParam {
    email: string,
    password: string
    rePassword?: string
    captcha: string
}

declare interface UserProfileParam {
    username: string,
    profile: string,
    position: string,
    blog: string,
    company: string,
    avatar: string
}

declare interface PageParam {
    /**
     * 页码s
     */
    pageNum: number
    /**
     * 元素个数
     */
    pageSize: number
    /**
     * 关联的对象ID
     */
    itemId?: string | number
}

type SearchParam = PageParam & {
    keyword?: string
    type?: number
}

declare interface ArticleDraftParam {
    id?: string | number
    title?: string
    picture?: string
    summary?: string
    content?: string
    categoryId?: number
    tagIds?: Array<number> | null
}

declare type ArticleParam = PageParam & {
    cateId: number
}

declare type UserArticleParam = PageParam & {
    userId: number
}

declare interface LikeItemParam {
    itemId: number
    itemType: 1 | 2
}

declare interface CommentParam {
    articleId: number | string
    rootId?: number | string | null
    parentId?: number | string | null
    content: string
    contentImg?: string
}

declare type CommentPageParam = PageParam & {
    articleId: number,
    rootId?: number,
    sort?: 0 | 1
}