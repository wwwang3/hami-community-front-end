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
        return http.post("/article_draft/update", param)
    },
    publishArticle(draftId: number): Promise<ArticleDraft> {
        return http.post("/article_draft/publish", null, {
            params: {
                draftId: draftId
            }
        })
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
    },
    uploadPicture(pic: File): Promise<string> {
        console.log(pic)
        let data = new FormData()
        data.set("picture", pic)
        return http.post("/article_draft/upload/pic", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const ArticleService: ArticleServiceApi = {

    listRecommendArticles(param: ArticleParam): Promise<PageData<Article>> {
        return http.post("/article/list/recommend", {
            ...param,
            cateId: param.cateId === -1 ? null: param.cateId
        })
    },

    listFollowUserUserArticles(param: PageParam): Promise<PageData<Article>> {
        return http.post("/article/list/follow", param)
    },

    getArticleContent(id: number): Promise<ArticleContent> {
        return http.get("/article/detail", {
            params: {
                article_id: id
            }
        })
    },

    listHotArticles(cateId: number): Promise<Array<HotArticle>> {
        console.log(cateId)
        return http.get("/article/rank/hot", {
            params: {
                category_id: cateId === -1 ? null : cateId
            }
        })
    },

    listUserArticles(param: UserArticleParam): Promise<PageData<Article>> {
        return http.post("/article/query_list", param)
    }

}