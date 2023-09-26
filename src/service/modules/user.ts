import http, { FORM_DATA } from '@/service/http.ts'
import User from '@/store/modules/user.ts'

const UserService: UserServiceApi = {

    getLoginProfile(): Promise<LoginProfile> {
        return http.get("/user/me")
    },

    getUserProfile(): Promise<UserProfile> {
        return http.get("/user/profile")
    },

    getAuthorInfo(user_id: number): Promise<User> {
        return http.get("/user/author_info/" + user_id)
    },

    updateUserProfile(params: UserProfileParam): Promise<any> {
        console.log(params)
        return http.post("/user/update", params)
    },

    updateAvatar(avatar: File): Promise<string> {
        let data = new FormData()
        data.set("avatar", avatar)
        return http.post("/user/avatar/upload", data, {
            headers: {
                "Content-Type": FORM_DATA
            }
        })
    },

    getAccountInfo(): Promise<AccountInfo> {
        return http.get("/user/account/info")
    },

    getLoginRecords(param: PageParam): Promise<PageData<LoginRecord>> {
        return http.get("/user/login/log", {
            params: param
        })
    },

}

export default UserService