/**
 * 接口响应数据遵循的格式
 */
declare interface ApiResponse<T> {
    code: number,
    data: T,
    msg: string
}

declare interface UserInfo {
    id: string | number,
    username: string,

}