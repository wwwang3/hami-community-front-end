import {reactive} from 'vue'
import {formatDateTime} from '@/utils'
import avatar from "/assets/avatar.jpg"
import http from '@/service/http.ts'

const UserService: UserServiceApi = {

    getLoginProfile(): Promise<SimpleUserInfo> {
        return http.get("/nav/profile")
    },
    getUserProfile(): Promise<UserProfile> {
        return new Promise((resolve, reject) =>
            setTimeout(() => {
                resolve(http.get("/user/profile"))
            }, 4000)
        )
    }

}

export default UserService