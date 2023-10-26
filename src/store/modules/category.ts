import { defineStore } from 'pinia'
import { ref } from 'vue'

export type CateRoutePath = "/" | "/recommend" | "/backend" | "/front-end" | "/android"
    | "/ios" | "/ai" | "/tool" |  "/coding" | "/reading" | "/follow"

export const useCateStore = defineStore("cate", () => {
    const cates = ref({
        "/": -1,
        "/recommend": -1,
        "/follow": -1,
        "/backend": 10000,
        "/front-end": 10001,
        "/android": 10002,
        "/ios": 10003,
        "/ai": 10004,
        "/tool": 10005,
        "/coding": 10006,
        "/reading": 10007,
    })
    const cateRoutes = [
        "/", "/recommend", "/backend", "/front-end", "/android", "/ios", "/ai", "/tool", "/coding", "/reading"
    ]

    const findCateRoure = (cateId: number) => {
        for (let ele in cates) {
            // @ts-ignore
            if (cates[ele] === cateId) {
                return ele;
            }
        }
        return "/"
    }

    return { cates, cateRoutes, findCateRoure}
})