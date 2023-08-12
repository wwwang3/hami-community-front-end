declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>
    logout(): Promise<any>
}