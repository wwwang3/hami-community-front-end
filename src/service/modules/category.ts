import http from '@/service/http.ts'


export const CategoryService: CategoryServiceApi = {
    getAllCategories(): Promise<Array<Category>> {
        return http.get("/category/all")
    }
}
//@ts-ignore
import type { Tag } from "/types/api"
export const TagService: TagServiceApi = {
    listTags(param: PageParam): Promise<PageData<Tag>> {
        return http.get("/tag/list", {
            params: {
                pageNum: param.pageNum,
                pageSize: param.pageSize
            }
        })
    }
}