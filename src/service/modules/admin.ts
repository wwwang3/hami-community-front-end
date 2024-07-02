import Comment from '@/service/modules/comment.ts'
import User from '@/store/modules/user.ts'
import http from '@/service/http.ts'

export const AdminService: AdminServiceApi = {
    deleteBulletin(id: number): Promise<any> {
        return http.post(`/admin/bulletin/delete/${id}`, {})
    },

    deleteComment(id: number) {
        return http.post(`/admin/comment/delete/${id}`, {})
    },

    deleteUser(id: number): Promise<any> {
        return http.post(`/admin/user/delete/${id}`, {})
    },

    listBulletin(param: PageParam): Promise<PageData<Bulletin>> {
        return http.post(`/admin/bulletin/list`, param)
    },

    listComment(param: PageParam): Promise<PageData<Comment>> {
        return http.post(`/admin/comment/list`, param)
    },

    listReviewDraft(param: ArticleDraftPageParam): Promise<PageData<ArticleDraftVo>> {
        return http.post("/admin/content/article/list", param)
    },

    listUser(param: PageParam): Promise<PageData<User>> {
        return http.post(`/admin/user/list`, param)
    },

    publishBulletin(param: BulletinParam): Promise<Bulletin> {
        return http.post(`/admin/bulletin/publish`, param)
    },

    review(param: ArticleDraft, msg: String): Promise<any> {
        return http.post(`/admin/content/review`, param, {
            params: {
                "msg": msg
            }
        })
    },

    getSiteStat(): Promise<SiteStat> {
        return http.get("/admin/stat/site")
    }



    // reviewPass(param: ArticleDraft): Promise<any> {
    //     return http.post(`/admin/content/review/pass`, param)
    // },
    //
    // reviewReject(param: ArticleDraft, msg: string): Promise<any> {
    //     return http.post(`/admin/content/review/reject`, param)
    // }

}