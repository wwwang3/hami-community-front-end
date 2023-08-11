declare interface UserServiceApi {

    login(params: LoginParam): Promise<ApiResponse<any>>
}