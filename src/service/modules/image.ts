import http, { FORM_DATA } from '@/service/http.ts'


const ImageService: ImageServiceApi = {

    upload(param: ImageUploadParam): Promise<string> {
        let formData = new FormData()
        formData.set("image", param.image)
        formData.set("type", param.type)
        return http.post("/image/upload", formData, {
            headers: {
                'content-type': FORM_DATA
            }
        })
    }

}

export default ImageService