declare interface AuthServiceApi {

    login(params: LoginParam): Promise<LoginResult>

    logout(): Promise<any>,

    getCaptcha(type: "register" | "reset" | "update", email: string): Promise<any>,

    register(param: RegisterParam): Promise<any>,

    resetPassword(param: ResetPassParam): Promise<any>,

    updatePassword(params: ResetPassParam): Promise<any>
}

declare interface UserServiceApi {
    getLoginProfile(): Promise<SimpleUserInfo>

    getUserProfile(): Promise<UserProfile>

    updateUserProfile(params: UserProfileParam): Promise<any>

    updateAvatar(avatar: File): Promise<string>

    getAccountInfo(): Promise<AccountInfo>
}