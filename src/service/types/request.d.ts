declare interface LoginParam {
    /**
     * 用户名
     */
    username: string
    /**
     * 密码
     */
    password: string
    /**
     * 验证码
     */
    captcha: string
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
    rePassword: string
    /**
     * 邮箱
     */
    email: string
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