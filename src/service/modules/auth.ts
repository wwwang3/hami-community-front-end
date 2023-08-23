import http, { FORM } from "../http.ts"

const AuthService: AuthServiceApi = {

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
    getCaptcha(type: "register" | "reset", email: string): Promise<any> {
        return http.get("/auth/captcha", {
            params: {
                type: type,
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
    }
}

function mock() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success")
        }, 5000)
    })
}

export default AuthService




