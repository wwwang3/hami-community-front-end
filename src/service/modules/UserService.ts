import {reactive} from 'vue'
import {formatDateTime} from '@/utils'
import avatar from "/assets/avatar.jpg"

const UserService: UserServiceApi = {

    getUserProfile(): Promise<UserInfo> {
        const userInfo: UserInfo = ({
            id: 1,
            username: "wang3",
            // avatar: 'https://static-oss.wang3.top/static/202308212218194.jpg',
            avatar: avatar,
            profile: "fw",
            blog: '/',
            company: '',
            ctime: formatDateTime(Date.now()),
            mtime: formatDateTime(Date.now()),
            position: "jvav菜鸡",
            tag: ''
        })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(userInfo)
            }, 2000)
        })
    }

}

export default UserService