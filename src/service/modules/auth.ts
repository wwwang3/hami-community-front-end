import http, { FORM } from "../http.ts"
import * as console from 'console'

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
        console.log(type, email)
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
    },
    getLoginProfile(): Promise<LoginProfile> {
        return http.get("/auth/me")
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




