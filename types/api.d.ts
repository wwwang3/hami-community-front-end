/**
 * 接口响应数据遵循的格式
 */
declare interface ApiResponse<T> {
    code: number,
    data: T,
    msg: string
}

declare interface PageData<T> {
    pageNum: number
    pageSize: number
    total: number
    data: Array<T> | null
}

declare interface UserProfile {
    userId: number,
    username: string,
    avatar: string,
    profile: string,
    position: string,
    blog: string,
    company: string,
    ctime: number
    tag?: string,
}

declare type LoginProfile = UserProfile & {
    likes: number, //我点赞的文章
    collects: number, //我收藏的文章
    followings: number, //我的关注
    followers: number //我的粉丝
    stat: UserStat | undefined
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
    ipInfo: IpInfo
    rootId: number | null
    parentId: number | null
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
    replyTo: number
    ipInfo: IpInfo
    rootId: number | null
    parentId: number | null
    content: string
    contentImg?: string
    likes: number
    ctime: number | Date
    reply?: Reply
    user: User
    replyUser?: User
    liked: boolean
}

declare interface NotifyInfo {
    id: number | string
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

declare interface NotifyCountMap {
    '0': number //系统
    '1': number //评论
    '2': number //评论回复
    '3': number //文章点赞
    '4': number //评论点赞
    '5': number //收藏
    '6': number //关注
    '7': number //待定
    '8': number //im 未开发
}

declare interface NotifyCountItem {
    "system": number,
    "reply": number,
    "love": number,
    "follow": number,
    "im": number
}

declare interface DailyDataGrowing {
    article_incr?: number
    view_incr?: number
    like_incr?: number
    comment_incr?: number
    collect_incr?: number
    follower_incr?: number
    cancel_follow_incr?: number
}
