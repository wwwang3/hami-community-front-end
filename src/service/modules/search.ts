
import http from '@/service/http.ts'

export const SearchService: SearchServiceApi = {

    searchArticle(param: SearchParam): Promise<PageData<Article>> {
        return http.post("/search/query_list", param)
    }
}