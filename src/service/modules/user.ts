import http, { FORM } from '@/service/http.ts'

export const CaptchaType = {
        "register": 0,
        "reset": 1,
        "update": 2
}

export const AuthService: AuthServiceApi = {

    login(params: LoginParam): Promise<LoginResult> {
        return http.post("/auth/login", params, {
            headers: {
                'Content-Type': FORM
            }
        })
    },

    logout(): Promise<any> {
        return http.post("/auth/logout")
    },

    getCaptcha(captcha: CaptchaSendParam): Promise<any> {
        return http.get("/auth/captcha", {
            params: {
                email: captcha.email,
                type: captcha.type
            }
        })
    },

    register(param: RegisterParam) {
        return http.post("/auth/register", param)
    },

    // 无需登录访问
    resetPassword(param: ResetPassParam): Promise<any> {
        return http.post("/auth/reset-pass", param)
    },

    // 登录访问
    updatePassword(param: ResetPassParam): Promise<any> {
        return http.post("/auth/update-pass", param)
    },
}

export const AccountService: AccountServiceApi = {

    getAccountInfo(): Promise<AccountInfo> {
        return http.get("/account/info")
    },

    getLoginRecords(param: PageParam): Promise<PageData<LoginRecord>> {
        return http.get("/account/login/log", {
            params: param
        })
    },

    updateUserProfile(params: UserProfileParam): Promise<any> {
        console.log(params)
        return http.post("/account/update", params)
    },

    getLoginProfile(): Promise<LoginProfile> {
        return http.get("/account/me")
    }

}

export const UserService: UserServiceApi = {

    getAuthorInfo(user_id: number): Promise<Author> {
        return http.get(`/user/info/${user_id}`)
    },
}