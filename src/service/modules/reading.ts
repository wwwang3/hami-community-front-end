import http from '@/service/http.ts'

export const ReadingRecordService: ReadingRecordServiceApi = {

    clearReadingRecords() {
        return http.post("/interact/reading_record/clear")
    },

    deleteReadingRecord(record_id: number) {
        let data = new FormData()
        data.set("record_id", record_id + "")
        return http.post("/interact/reading_record/delete", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    listReadingRecord(param: SearchParam): Promise<PageData<ReadingRecord>> {
        return http.post("/interact/reading_record/query_list", param)
    },

}