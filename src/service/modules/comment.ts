import http from '@/service/http.ts'

const CommentService: CommentServiceApi = {
    listComment(param: CommentPageParam): Promise<PageData<CommentInfo>> {
        return http.post("/comment/query_list", param)
    },

    listReply(param: CommentPageParam): Promise<PageData<CommentInfo>> {
        return http.post("/comment/reply/query_list")
    },

    publishComment(param: CommentParam, reply: boolean = false): Promise<Comment> {
        if (reply) {
            return this.submitReply(param)
        } else {
            return this.submitComment(param)
        }
    },

    submitComment(param: CommentParam): Promise<Comment> {
        return http.post("/comment/submit", param)
    },

    submitReply(param: CommentParam): Promise<Comment> {
        return http.post("/comment/reply/submit", param)
    },

    deleteComment(id: number): Promise<any> {
        return http.post("/comment/delete", null, {
            params: {
                id: id
            }
        })
    }

}

export default CommentService