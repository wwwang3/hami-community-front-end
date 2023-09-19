import http from '@/service/http.ts'

const CommentService: CommentServiceApi = {
    listComment(param: CommentPageParam): Promise<PageData<CommentInfo>> {
        return http.post("/comment/query_list", param)
    },

    listReply(param: CommentPageParam): Promise<PageData<CommentInfo>> {
        return http.post("/comment/reply/query_list")
    },

    submitComment(param: CommentParam): Promise<Comment> {
        return http.post("/interact/comment/submit", param)
    },

    submitReply(param: CommentParam): Promise<Comment> {
        return http.post("/interact/reply/submit")
    },

    deleteComment(id: number): Promise<any> {
        return http.post("/interact/comment/delete", null, {
            params: {
                id: id
            }
        })
    }

}