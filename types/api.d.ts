

/**
 * 接口响应数据遵循的格式
 */
declare interface ApiResponse<T> {
    code: number,
    data: T,
    msg: string
}

declare interface SimpleUserInfo {
    userId: string | number,
    username: string,
    avatar: string,
    profile: string,
    tag?: string,
    likes: number,
    collects: number,
    followings: number,
    followers: number
}

declare interface UserProfile {
    userId: string | number,
    username: string,
    avatar: string,
    profile: string,
    position: string,
    blog: string,
    company: string,
    tag?: string,
}

declare interface LoginResult {
    readonly tokenName: string,
    readonly tokenValue: string
}

declare interface AccountInfo {
    email: string,
    weixin?: string,
    github?: string,
    qq?: string
}

declare interface Tag {
    id: string | number
    name: string
}

declare interface ArticleDraft {
    id: string | number,
    articleId: string | number
    userId: string | number
    title: string
    picture: string,
    summary: string,
    content: string //内容
    tagIds: Array<number> | null,
    categoryId: string | number
    state: number,
    deleted?: number
    version?: number,
    ctime: Date,
    mtime: Date
}

declare interface ArticleDraftDetail {
    id: string | number,
    articleId: string | number
    userId: string | number
    title: string
    picture: string,
    summary: string,
    content: string //内容
    tags: Array<Tag> | null,
    categoryId: string | number
    state?: number
    ctime: Date,
    mtime: Date
}

declare interface PageData<T> {
    pageNum: number
    pageSize: number
    total: number
    data: Array<T> | null | ""
}