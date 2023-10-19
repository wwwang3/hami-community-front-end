import http from '@/service/http.ts'

const CommentService: CommentServiceApi = {
    listComment(param: CommentPageParam): Promise<PageData<CommentInfo>> {
        return http.post("/comment/query_list", param)
    },

    listReply(param: CommentPageParam): Promise<PageData<CommentInfo>> {
        return http.post("/comment/reply/query_list")
    },

    submitComment(param: CommentParam): Promise<Comment> {
        return http.post("/comment/submit", param)
    },

    submitReply(param: CommentParam): Promise<Comment> {
        return http.post("/reply/submit")
    },

    deleteComment(id: number): Promise<any> {
        return http.post("/comment/delete", null, {
            params: {
                id: id
            }
        })
    }

}