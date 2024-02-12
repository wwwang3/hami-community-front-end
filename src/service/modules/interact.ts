import http from '@/service/http.ts'

export const ReadingRecordService: ReadingRecordServiceApi = {

    clearReadingRecords() {
        return http.post("/interact/reading_record/clear")
    },

    deleteReadingRecord(record_id: number) {
        return http.post("/interact/reading_record/delete", null, {
            params: {
                "recordId": record_id
            }
        })
    },

    listReadingRecord(param: SearchParam): Promise<PageData<ReadingRecord>> {
        return http.post("/interact/reading_record/query_list", param)
    },

}

export const UserInteractService: UserInteractApi = {

    follow(followingId: number) {
        return http.post("/interact/follow", null, {
            params: {
                followingId: followingId
            }
        })
    },

    unfollow(followingId: number): Promise<any> {
        return http.post("/interact/follow/cancel", null, {
            params: {
                followingId: followingId
            }
        })
    },

    collect(articleId: number): Promise<any> {
        return http.post("/interact/collect", null, {
            params: {
                articleId: articleId
            }
        })
    },

    cancelCollect(articleId: number): Promise<any> {
        return http.post("/interact/collect/cancel", null, {
            params: {
                articleId: articleId
            }
        })
    },

    like(param: LikeItemParam): Promise<any> {
        return http.post("/interact/like", param)
    },

    cancelLike(param: LikeItemParam): Promise<any> {
        return http.post("/interact/like/cancel", param)
    },

    listCollectArticle(param: UserArticleParam): Promise<PageData<Article>> {
        return http.post("/interact/collect/query_list", param)
    },

    listUserFollowing(param: UserArticleParam): Promise<PageData<User>> {
        return http.post("/interact/follow/following_list", param)
    },

    listUserFollower(param: UserArticleParam): Promise<PageData<User>> {
        return http.post("/interact/follow/follower_list", param)
    },

    listUserLikeArticle(param: UserArticleParam): Promise<PageData<Article>> {
        return http.post("/interact/like/query_list", param)
    },

    getUserDataGrowing(): Promise<DailyDataGrowing> {
        return http.get("/interact/data_growing")
    }

}