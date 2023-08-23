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

declare interface AccountInfo {
    email: string,
    weixin?: string,
    github?: string,
    qq?: string
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
}

declare interface PageParam {
    /**
     * 页码
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
    /**
     * 排序字段
     */
    sort?: string
}