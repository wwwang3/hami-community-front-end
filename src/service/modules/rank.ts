import http from '@/service/http.ts'

export const RankService: RankServiceApi = {

    listHotArticle(cateId: string | number): Promise<Array<HotArticle>> {
        return http.get("/rank/hot/article", {
            params: {
                cateId: cateId
            }
        })
    },


    listHotAuthor(): Promise<Array<HotAuthor>> {
        return http.get("/rank/hot/author")
    }


}