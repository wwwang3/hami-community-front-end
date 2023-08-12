import http from "../http.ts"
import { FORM } from '../http.ts'

const AuthService: AuthServiceApi = {

    login(params: LoginParam): Promise<LoginResult> {
        return http.post("/auth/login", {...params}, {
            headers: {
                'Content-Type': FORM
            }
        })
    }
}

export default AuthService




