import {$message} from '@/utils/message.ts'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'

const defaultConfig: Partial<AxiosRequestConfig> = {
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000,
    withCredentials: true
}

function createInstance() {
    
    const instance: AxiosInstance = axios.create(defaultConfig)

    //请求拦截器
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        //todo
        return config
    }, (error) => {
        console.log(error)
        return Promise.reject("request error")
    })

    //响应拦截器
    instance.interceptors.response.use((response: AxiosResponse<ApiResponse<any> | any>): Promise<any> => {
        let data = response.data
        let responseType = response.request?.responseType
        if (responseType === "blob" || responseType === "arraybuffer") {
            return Promise.resolve(data)
        }
        let apiData =  data as ApiResponse<any>
        let code = apiData.code
        if (code === undefined) {
            $message.error("system error")
            return Promise.reject("error")
        }
        switch (code) {
            case  200:
                //success
                //返回数据
                return Promise.resolve(apiData.data)
            default:
                console.log(apiData)
                $message.error(apiData.msg)
                //错误信息
                return Promise.reject(apiData.msg)
        }
    }, (error): Promise<string> => {
        let response = error as AxiosResponse
        console.log(error)
        let status = response.status
        switch (status) {
            //todo
        }
        return Promise.reject("error")
    })

    return instance
}

const http = createInstance()
export const FORM_DATA= "multipart/form-data"
export const FORM = "application/x-www-form-urlencoded"
export default http