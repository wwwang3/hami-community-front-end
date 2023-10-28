
import http from '@/service/http.ts'

export const SearchService: SearchServiceApi = {

    searchArticle(param: SearchParam): Promise<PageData<Article>> {
        return http.post("/search/query_list", param, {
            timeout: 8000
        })
    },

    getHotSearchList(): Promise<Array<string>> {
        return http.get("/search/hot")
    }
}