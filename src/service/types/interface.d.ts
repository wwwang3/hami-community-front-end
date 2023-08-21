declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>
    logout(): Promise<any>,
    getCaptcha(type: "register" | "reset", email: string): Promise<any>,
    register(param: RegisterParam): Promise<any>,
    resetPassword(param: ResetPassParam): Promise<any>
}

declare interface UserServiceApi {
    getUserProfile(): Promise<UserInfo>
}