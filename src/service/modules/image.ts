import http, { FORM_DATA } from '@/service/http.ts'


const ImageService: ImageServiceApi = {

    upload(image: File, type: "comment" | "avatar" | "article"): Promise<string> {
        let formData = new FormData()
        formData.set("image", image)
        formData.set("type", type)
        return http.post("/image/upload", formData, {
            headers: {
                'content-type': FORM_DATA
            }
        })
    }

}

export default ImageService