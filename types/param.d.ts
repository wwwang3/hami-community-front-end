
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

declare interface ArticleDraftParam {
    id: string | number
    title?: string
    picture?: string
    summary?: string
    content?: string
    categoryId?: string
    tagIds?: Array<number> | null
}
