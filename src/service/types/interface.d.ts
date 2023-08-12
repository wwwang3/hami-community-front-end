declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>
}