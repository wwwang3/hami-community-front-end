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

declare interface Category {
    id: number
    name: string
    path: string
}

declare interface Tag {
    id: number
    name: string
}

declare interface ArticleDraft {
    id: number,
    articleId: number
    userId: number
    title: string
    picture: string,
    summary: string,
    content: string //内容
    tagIds: Array<number> | null,
    categoryId: number
    state: number,
    deleted?: number
    version?: number,
    ctime: Date,
    mtime: Date
}

declare interface ArticleDraftDetail {
    id: number,
    articleId: number
    userId: number
    title: string
    picture: string,
    summary: string,
    content: string //内容
    tags: Array<Tag> | null,
    categoryId: number
    state?: 0 | 1 | 2
    ctime?: Date | undefined,
    mtime?: Date | undefined
}

declare interface IpInfo {
    /**
     * IPv4地址
     */
    ip: string;
    /**
     * 国家
     */
    country: string;
    /**
     * 省
     */
    province: string;
    /**
     * 城市
     */
    city: string;
    /**
     * 区域
     */
    area: string;
    /**
     * 运营商
     */
    isp: string;

}

declare interface LoginRecord {
    id: number
    userId: number
    ipInfo: IpInfo
    loginTime: Date | string
    deleted?: 0 | 1
    ctime?: Date | string
    mtime?: Date | string
}


declare interface PageData<T> {
    pageNum: number
    pageSize: number
    total: number
    data: Array<T> | null
}