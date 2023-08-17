declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>
    logout(): Promise<any>,
    getCaptcha(type: "register" | "rest", email: string): Promise<any>,
    register(param: RegisterParam),
}