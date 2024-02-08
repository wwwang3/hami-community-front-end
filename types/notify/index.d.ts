

declare type NotifyType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

declare interface Info {
    id: number // 关联的对象ID
    name: string // 关联对象的名称
    image: string // 图片
    detail: string // 内容
    followed: boolean // 是否关注
}

declare interface NotifyMsg {
    id: number // 消息ID
    ctime: number // 消息创建时间
    state: 0 | 1 // 消息状态
    type: NotifyType // 消息类型
    sender: Info // 消息发送者
    relatedInfo: Info // 关联的对象信息
    itemInfo: Info // 消息内容
}

declare interface NotifyCountMap {
    '0': number // 系统
    '1': number // 评论
    '2': number // 评论回复
    '3': number // 文章点赞
    '4': number // 评论点赞
    '5': number // 收藏
    '6': number // 关注
    '7': number // 待定
    '8': number // im 未开发
}

declare interface NotifyCountItem {
    "system": number,
    "reply": number,
    "love": number,
    "follow": number,
    "im": number
}