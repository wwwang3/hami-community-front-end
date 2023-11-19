import http, { FORM } from '@/service/http.ts'

const CaptchaType = {
        "register": 0,
        "reset": 1,
        "update": 2
}

export const AuthService: AuthServiceApi = {



    login(params: LoginParam): Promise<LoginResult> {
        return http.post("/auth/login", { ...params }, {
            headers: {
                'Content-Type': FORM
            }
        })
    },

    logout(): Promise<any> {
        return http.post("/auth/logout")
    },

    getCaptcha(type: "register" | "reset" | "update", email: string): Promise<any> {
        return http.get("/auth/captcha", {
            params: {
                type: CaptchaType[type],
                email: email
            }
        })
    },

    register(param: RegisterParam) {
        return http.post("/auth/register", {
            username: param.username,
            email: param.email,
            password: param.password,
            captcha: param.captcha
        })
    },

    //无需登录访问
    resetPassword(param: ResetPassParam): Promise<any> {
        return http.post("/auth/reset-pass", {
            email: param.email,
            password: param.password,
            captcha: param.captcha
        })
    },

    //登录访问
    updatePassword(params: ResetPassParam): Promise<any> {
        return http.post("/auth/update-pass", {
            email: params.email,
            password: params.password,
            captcha: params.captcha
        })
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

    getAuthorInfo(user_id: number): Promise<User> {
        return http.get("/user/info/" + user_id)
    },
}