import http, { FORM_DATA } from '@/service/http.ts'

const UserService: UserServiceApi = {

    getLoginProfile(): Promise<SimpleUserInfo> {
        return http.get("/nav/profile")
    },
    getUserProfile(): Promise<UserProfile> {
        return http.get("/user/profile")
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
    }

}

export default UserService