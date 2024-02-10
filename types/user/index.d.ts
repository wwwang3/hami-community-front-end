declare interface UserProfile {
    account?: string // 账号名
    userId: number // 作者ID
    username: string // 用户名
    avatar: string // 头像
    profile: string // 个性签名
    position: string // 职位
    blog: string // 个人主页
    company: string // 公司
    ctime: number // 创建时间
    tag?: string // 标签
}


declare interface Author extends UserProfile {
    stat: UserStat // 用户数据
    followed: boolean // 当前登录用户是否关注该作者
}


declare interface LoginProfile extends UserProfile {
    likes: number // 我点赞的文章
    collects: number // 我收藏的文章
    followings: number // 我的关注
    followers: number // 我的粉丝
    stat: UserStat
}

declare interface AccountInfo {
    id: number // 账号ID
    account: string // 账号名
    email: string // 邮箱
    weixin?: string // 微信
    github?: string // github
    qq?: string // qq
}

declare interface LoginRecord {
    id: number // 记录ID
    userId: number // 用户ID
    ip: IpInfo // IP
    ua: string // UserAgent
    ctime: number // 创建时间
}

declare interface RegisterParam {
    username: string // 用户名
    email: string // 邮箱
    captcha: string // 验证码
    password: string // 密码
}

declare interface LoginParam {
    account: string // 用户名 或者邮箱
    password: string // 密码
}

declare interface ResetPassParam {
    email: string // 邮箱
    captcha: string // 验证码
    password: string // 密码
}

declare interface UserProfileParam {
    username: string // 用户名
    profile: string // 个性签名
    position: string // 职位
    blog: string // 个人主页
    company: string // 公司
    avatar: string // 头像
}

declare interface CaptchaSendParam {
    email: string // 邮箱
    type: 0 | 1 | 2 // 0: 注册验证码 1: 重置密码验证码 2: 修改密码验证码
}

declare interface LoginResult {
    readonly tokenName: string // token名称
    readonly tokenValue: string // token值
    readonly uploadSecret?: string // 上传凭证
}