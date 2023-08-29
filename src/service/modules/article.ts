import http from '@/service/http.ts'

export const ArticleDraftService: ArticleDraftServiceApi = {

    getArticleDraft(id: number): Promise<ArticleDraftDetail> {
        return http.get("/article_draft/get", {
            params: {
                draftId: id
            }
        })
    },
    getDrafts(pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>> {
        return http.get("/article_draft/drafts", {
            params: {
                pageNum,
                pageSize
            }
        })
    },
    getArticles(pageNum: number, pageSize: number): Promise<PageData<ArticleDraftDetail>> {
        return http.get("/article_draft/articles", {
            params: {
                pageNum,
                pageSize
            }
        })
    },
    createDraft(param: ArticleDraftParam): Promise<ArticleDraft> {
        return http.post("/article_draft/create", param)
    },
    updateDraft(param: ArticleDraftParam): Promise<ArticleDraft> {
        return http.post("/article_draft/update")
    },
    publishArticle(param: ArticleDraftParam): Promise<ArticleDraft> {
        return http.post("/article_draft/publish", param)
    },
    deleteArticle(id: number): Promise<any> {
        return http.post("/article_draft/delete/article", null, {
            params: {
                articleId: id
            }
        })
    },
    deleteDraft(id: number): Promise<any> {
        return http.post("/article_draft/delete/draft", null, {
            params: {
                draftId: id
            }
        })
    }
}