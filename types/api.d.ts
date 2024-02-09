/**
 * 图像上传参数
 */
declare interface ImageUploadParam {
    image: File // 图片
    type: 'article-picture' | 'avatar' | 'comment'// 类型
}

/**
 * 通用分页参数
 */
declare interface PageParam {

    /**
     * 页码s
     */
    current: number

    /**
     * 元素个数
     */
    size: number

    /**
     * 关联的对象ID
     */
    itemId?: string | number
}


/**
 * 接口响应数据遵循的格式
 */
declare interface ApiResponse<T> {
    code: number // 响应码
    msg: string // 响应信息
    data: T // 响应数据
}

declare interface PageData<T> {
    current: number // 当前页码
    total: number // 总数量
    data: Array<T> | null
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

declare interface IdParam {
    id: number | string
    type: number
}