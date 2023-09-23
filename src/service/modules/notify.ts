import http from "../http.ts"

export const NotifyService: NotifyServiceApi = {

    queryCommentNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/comment/query_list", param)
    },

    queryLikeCollectNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/like_collect/query_list", param)
    },

    queryFollowNotify(param: PageParam): Promise<PageData<NotifyMsg>> {
        return http.post("/notify/follow/query_list", param)
    },

    queryNotify(notify_type: "comment" | "like_collect" | "follow", param: PageParam): Promise<PageData<NotifyMsg>> {
        if (notify_type === "comment") {
            return this.queryCommentNotify(param)
        } else if (notify_type === "like_collect") {
            return this.queryLikeCollectNotify(param)
        } else if (notify_type === "follow") {
            return this.queryFollowNotify(param)
        } else {
            return Promise.reject("un supported operation")
        }
    },

    getNoReadCount(): Promise<NotifyCount> {
        return http.get("/notify/count")
    }

}