import http, {FORM} from "../http.ts"

const AuthService: AuthServiceApi = {

    login(params: LoginParam): Promise<LoginResult> {
        return http.post("/auth/login", {...params}, {
            headers: {
                'Content-Type': FORM
            }
        })
    },
    logout(): Promise<any> {
        return http.post("/auth/logout")
    },
    getCaptcha(type: "register" | "rest", email: string): Promise<any> {
        return http.get("/auth/captcha", {
            params: {
                type: type,
                email: email
            }
        })
    },
    register(param: RegisterParam) {
        return http.post("/auth/register", param)
    },
    resetPassword(param: ResetPassParam): Promise<any> {
        return http.post("/auth/reset-pass", {...param})
    }

}

export default AuthService




