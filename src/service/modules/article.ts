import http from '@/service/http.ts'

export const ArticleDraftService: ArticleDraftServiceApi = {

    /**
     * 获取草稿
     * @param page
     */
    listDraft(page: ArticleDraftPageParam): Promise<PageData<ArticleDraft>> {
        return http.post("/draft/list", page)
    },

    /**
     * 获取草稿
     * @param id
     */
    getArticleDraft(id: number): Promise<ArticleDraft> {
        return http.get(`/draft/get/${id}`, {
            params: {
                draftId: id
            }
        })
    },

    /**
     * 创建草稿
     * @param param
     */
    createDraft(param: ArticleDraftParam): Promise<ArticleDraft> {
        return http.post("/draft/create", param)
    },

    /**
     * 更新草稿
     * @param param
     */
    updateDraft(param: ArticleDraftParam): Promise<ArticleDraft> {
        return http.post("/draft/update", param)
    },

    /**
     * 发布文章
     * @param draftId 草稿ID
     */
    publishArticle(draftId: number): Promise<any> {
        return http.post("/draft/publish", null, {
            params: {
                draftId: draftId
            }
        })
    },

    /**
     * 删除文章 state == 1 or 2 or 3
     * @param id
     */
    deleteArticle(id: number): Promise<any> {
        return http.post("/draft/article/delete", null, {
            params: {
                draftId: id
            }
        })
    },

    /**
     * 删除草稿
     * @param id
     */
    deleteOriginDraft(id: number): Promise<any> {
        return http.post("/draft/delete", null, {
            params: {
                draftId: id
            }
        })
    }
}

export const ArticleService: ArticleServiceApi = {

    listNewestArticle(param: ArticleParam): Promise<PageData<Article>> {
        return http.post("/article/list/recommend", {
            ...param,
            cateId: param.cateId === -1 ? null : param.cateId
        })
    },

    listFollowUserArticle(param: PageParam): Promise<PageData<Article>> {
        return http.post("/article/follow/query_list", param)
    },

    getArticleContent(id: number): Promise<Article> {
        return http.get(`/article/detail/${id}`)
    },


    listUserArticles(param: UserArticleParam): Promise<PageData<Article>> {
        return http.post("/article/user/query_list", param)
    }

}