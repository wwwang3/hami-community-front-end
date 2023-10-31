import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { NOTIFY_STORE } from '@/store/keys.ts'
import { ifNull, calculate, isEmpty } from '@/utils'
import { NotifyService } from '@/service/modules/notify.ts'


export type NotifyRouteType = "/notify/reply" | "/notify/love" | "/notify/follow" | "/notify/im" | "/notify/system"

export interface NotifyRouteItem {
    path: NotifyRouteType
    name: string
    type: keyof NotifyCountItem
}

const useNotifyStore = defineStore(NOTIFY_STORE, () => {

    const notifyRoutes: Array<NotifyRouteItem> = [
        {
            path: '/notify/reply',
            name: '评论',
            type: "reply",
        },
        {
            path: '/notify/love',
            name: '赞和收藏',
            type: 'love',
        },
        {
            path: '/notify/follow',
            name: '新增粉丝',
            type: 'follow'
        },
        {
            path: '/notify/im',
            name: '私信',
            type: 'im'
        },
        {
            path: '/notify/system',
            name: '系统通知',
            type: 'system'
        },
    ]

    const notifyCountMap = ref<NotifyCountMap>({
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0
    })

    const notifyCountItem = computed<NotifyCountItem>(() => {
        return {
            system: ifNull(notifyCountMap.value['0'], 0),
            reply: calculate(notifyCountMap.value['1'], notifyCountMap.value['2']),
            love: calculate(notifyCountMap.value['3'], notifyCountMap.value['4'], notifyCountMap.value['5']),
            follow: ifNull(notifyCountMap.value['6'], 0),
            im: ifNull(notifyCountMap.value['8'], 0),
        }
    })

    const unReadCount = computed(() => {
        return calculate(...Object.values(notifyCountMap.value))
    })

    const init = async () => {
        try {
            let data: NotifyCountMap = await NotifyService.getNoReadCount()
            if (!isEmpty(data)) {
                notifyCountMap.value = data
            }
        } catch (e) {
            // ignore it
        }
    }

    const doRead = (type: keyof NotifyCountItem) => {
        switch (type) {
            case "follow": {
                notifyCountMap.value['6'] = 0
                break
            }
            case "im": {
                notifyCountMap.value['8'] = 0
                break
            }
            case "system": {
                notifyCountMap.value['0'] = 0
                break
            }
            case "love": {
                //点赞和关注
                notifyCountMap.value['3'] = 0
                notifyCountMap.value['4'] = 0
                notifyCountMap.value['5'] = 0
                break
            }
            case "reply": {
                notifyCountMap.value['1'] = 0
                notifyCountMap.value['2'] = 0
                break
            }
            default:
                break
        }
    }

    return { notifyCountMap, notifyCountItem, unReadCount, notifyRoutes, init, doRead }

})

export default useNotifyStore