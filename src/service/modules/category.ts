import http from '@/service/http.ts'


export const CategoryService: CategoryServiceApi = {
    getAllCategory(): Promise<Array<Category>> {
        return http.get("/category/all")
    }
}

export const TagService: TagServiceApi = {
    listTag(param: PageParam): Promise<PageData<Tag>> {
        return http.post("/tag/query_list", param)
    },

    getAllTag(): Promise<Array<Tag>> {
        return http.get("/tag/all")
    }
}