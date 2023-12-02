import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TagProps, TimelineItemProps } from 'element-plus'

export type CateRoutePath = "/" | "/recommend" | "/backend" | "/front-end" | "/android"
    | "/ios" | "/ai" | "/tool" | "/coding" | "/reading" | "/follow"

export type TagType = TagProps['type']
export type TimelineTagType = TimelineItemProps['type']

export const TAG_NODES: Array<TagType> = ["" , "success", "warning", "info", "danger"]
export const TIMELINE_TAG_NODES: Array<TimelineTagType> = ["success", "warning", "info", "primary", "danger"]

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

    const cateRoutes: Array<Exclude<CateRoutePath, "/follow">> = [
        "/", "/recommend", "/backend", "/front-end", "/android", "/ios", "/ai", "/tool", "/coding", "/reading"
    ]

    const findCateRoute = (cateId: number | string): CateRoutePath => {
        let path = Object.entries(cates.value).find(item => item[1] == cateId)
        return path === undefined ? "/" : path[0] as CateRoutePath
    }

    return { cates, cateRoutes, findCateRoute }
})
