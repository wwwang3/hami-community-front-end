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
    }
}

export default AuthService




