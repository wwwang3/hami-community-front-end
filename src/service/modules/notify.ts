import http from "../http.ts"

export const NotifyService: NotifyServiceApi = {

    queryCommentNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/reply/query_list", param)
    },

    queryLikeCollectNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/love/query_list", param)
    },

    queryFollowNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/follow/query_list", param)
    },

    querySystemNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/system/query_list", param)
    },

    queryNotify(notify_type: "reply" | "love" | "follow" | "system", param: PageParam): Promise<PageData<NotifyMsg>> {
        if (notify_type === "reply") {
            return this.queryCommentNotify(param)
        } else if (notify_type === "love") {
            return this.queryLikeCollectNotify(param)
        } else if (notify_type === "follow") {
            return this.queryFollowNotify(param)
        } else if (notify_type === "system") {
            return this.querySystemNotify(param)
        } else {
            return Promise.reject("un supported operation")
        }
    },

    getNoReadCount(): Promise<NotifyCountMap> {
        return http.get("/notify/count")
    },

    deleteNotify(msg_id: number) {
        let data = new FormData()
        data.set("msg_id", msg_id + "")
        return http.post("/notify/delete", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    doRead(msg_id: number) {
        let data = new FormData()
        data.set("msg_id", msg_id + "")
        return http.post("/notify/read", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }


}