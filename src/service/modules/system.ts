import http from '@/service/http.ts'

class BulletinServiceImpl implements BulletinServiceApi {

    constructor() {
    }

    getNewBulletin(): Promise<Bulletin> {
        return http.get("/bulletin/new")
    }

    listBulletin(param: PageParam): Promise<PageData<Bulletin>> {
        return http.post("/bulletin/query_list", param)
    }

}

export const BulletinService: BulletinServiceApi = new BulletinServiceImpl()