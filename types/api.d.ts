/**
 * 接口响应数据遵循的格式
 */
declare interface ApiResponse<T> {
    code: number,
    data: T,
    msg: string
}

declare interface LoginProfile {
    userId: number,
    username: string,
    avatar: string,
    profile: string,
    ctime: number
    tag?: string,
    likes: number, //我点赞的文章
    collects: number, //我收藏的文章
    followings: number, //我的关注
    followers: number //我的粉丝
    stat: UserStat
}

declare interface UserProfile {
    userId: number,
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
    tags: Array<Tag> | null
    categoryId: number
    state?: 0 | 1 | 2
    ctime?: Date
    mtime?: Date
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

declare interface ArticleInfo {
    id: number,
    userId: number,
    categoryId: number,
    title: string,
    summary: string,
    picture: string
    ctime: number
    mtime: number
    tagIds: Array<number>
}

declare interface UserStat {
    userId: number,
    totalArticles: number,
    totalViews: number,
    totalCollects: number,
    totalLikes: number,
    totalComments: number,
    totalFollowers: number,
    totalFollowings: number,
}
declare interface ArticleStat {
    articleId: number,
    views: number,
    likes: number,
    comments: number,
    collects: number,
}

declare interface CategoryDTO {
    categoryId: number,
    categoryName: number
}
declare interface TagDTO {
    tagId: number,
    tagName: number
}

declare type User = UserProfile & {
    stat: UserStat
    ctime: number
    followed: boolean
}

declare interface Article {
    id: number,
    userId: number,
    articleInfo: ArticleInfo,
    author: User,
    stat: ArticleStat,
    category: CategoryDTO,
    tags: Array<TagDTO>
    liked: boolean,
    collected: boolean
}

declare type ArticleContent = Article & {
    content: string
}

declare interface HotArticle {
    articleId: number,
    hotRank: number,
    article: Article
}

declare interface ReadingRecord {
    id: number
    articleId: number
    userId: number
    readingTime: number | Date
    content: Article
}

declare interface Comment {
    id: number
    articleId: number
    userId: number
    isAuthor: boolean
    ipInfo: IpInfo
    rootId?: number
    parentId?: number
    content: string
    contentImg?: string
    replyTo?: number
    likes: number
    ctime: number | Date
}

declare interface Reply {
    total: number
    list: CommentInfo[]
}

declare interface CommentInfo {
    id: number
    articleId: number
    userId: number
    comment: Comment
    user: User
    replyTo?: User
    reply?: Reply
    liked: boolean
}

declare interface NotifyInfo {
    id: number
    name: string,
    image?: string
    detail: string
}

declare interface NotifyMsg {
    id: number,
    ctime: Date,
    state: 0 | 1
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    sender: NotifyInfo,
    relatedInfo: NotifyInfo,
    itemInfo: NotifyInfo
}

declare interface NotifyCount {
    '0': number
    '1': number
    '2': number
    '3': number
    '4': number
    '5': number
    '6': number
    '7': number
}

