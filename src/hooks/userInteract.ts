import { ref, Ref } from 'vue'
import { isEmpty } from '@/utils'
import { UserInteractService } from '@/service/modules/interact.ts'
import { useAutoLoading } from '@/hooks/index.ts'
import { loadUserStore } from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'
import { User } from '@element-plus/icons-vue'

const userStore = loadUserStore()

type ActionStateProps<T extends Array<any>> = {
    checkLogin?: boolean
    /**
     * 默认状态
     */
    active?: boolean,
    /**
     * 执行动作调用
     */
    action: (...params: T) => Promise<any>
    /**
     * 取消动作调用
     */
    cancel: (...params: T) => Promise<any>
}

type ActionFun<TParams extends Array<any>> = (...params: TParams) => Promise<boolean>;

type ActionResult<T extends Array<any>> = [ Ref<boolean>, ActionFun<T>]

function check(onRequest: Ref<Boolean>, checkLogin: boolean) {
    console.log(onRequest.value)
    if (checkLogin && !userStore.logined) {
        $message.notifyError("请登录后访问")
        return false
    }
    if (onRequest.value) {
        $message.notifyError("上个请求还没处理完(´･_･`)")
        return false
    }
    return true
}

export function useAction<T extends any[] = any[]>(props: ActionStateProps<T>): ActionResult<T> {
    const { active = false } = props || { active: false }
    const {checkLogin = true} = props || {checkLogin: true}
    const _active = ref<boolean>(active)
    const [onLoading, process] = useAutoLoading()
    const handleAction: ActionFun<T> = async (...params): Promise<boolean> => {
        if (!check(onLoading, checkLogin)) {
            return Promise.reject()
        }
        try {
            if (_active.value) {
                //动作已经激活
                let result = await process(props.cancel(...params))
                //没有reject认为成功
                _active.value = false
            } else {
                let result = await process(props.action(...params))
                _active.value = true
            }
            return Promise.resolve(_active.value)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return [ _active, handleAction]
}

export function useFollow(followed: boolean): ActionResult<[number]> {
    return useAction<[number]>({
        checkLogin: true,
        active: followed,
        action: (...params) => {
            return UserInteractService.follow(...params as Parameters<typeof UserInteractService.follow>)
        },
        cancel: (...params) => {
            return UserInteractService.unfollow(...params as Parameters<typeof UserInteractService.unfollow>)
        }
    })
}

export function useLike(liked: boolean): ActionResult<[{
    itemId: number,
    itemType: 1 | 2
}]> {
    return useAction<[{
        itemId: number,
        itemType: 1 | 2
    }]>({
        checkLogin: true,
        active: liked,
        action: (...params) => {
            return UserInteractService.like(...params as Parameters<typeof UserInteractService.like>)
        },
        cancel: (...params) => {
            return UserInteractService.cancelLike(...params as Parameters<typeof UserInteractService.cancelLike>)
        }
    })
}

export function useCollect(collectd: boolean): ActionResult<[number]> {
    return useAction({
        checkLogin: true,
        active: collectd,
        action: (...params) => {
            return UserInteractService.collect(...params as Parameters<typeof UserInteractService.collect>)
        },
        cancel: (...params) => {
            return UserInteractService.cancelCollect(...params as Parameters<typeof UserInteractService.cancelCollect>)
        }
    })
}