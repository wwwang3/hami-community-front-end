import http from "../http.ts"

const UserService: UserServiceApi = {

    login(params: LoginParam): Promise<ApiResponse<any>> {
        console.log(params)
        return http.get("/login")
    }
}

export default UserService




