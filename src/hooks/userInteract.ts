import { ref, Ref } from 'vue'
import { UserInteractService } from '@/service/modules/interact.ts'
import { useAutoLoading } from '@/hooks/index.ts'
import { loadUserStore } from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'

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

export type ActionFun<TParams extends Array<any>> = (...params: TParams) => Promise<boolean>;

export type ActionResult<T extends Array<any>> = [Ref<boolean>, ActionFun<T>]

function check(onRequest: Ref<Boolean>, checkLogin: boolean) {
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
    const { checkLogin = true } = props || { checkLogin: true }
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
            if (typeof e === "string") {
                $message.error(e)
            }
            return Promise.reject(e)
        }
    }

    return [_active, handleAction]
}

export function useFollow(followed: boolean): ActionResult<[number]> {
    return useAction<[number]>({
        checkLogin: true,
        active: followed,
        action: (...params) => {
            return UserInteractService.follow(...params)
        },
        cancel: (...params) => {
            return UserInteractService.unfollow(...params)
        }
    })
}

export function useLike(liked: boolean): ActionResult<[LikeItemParam]> {
    return useAction<[LikeItemParam]>({
        checkLogin: true,
        active: liked,
        action: (...params) => {
            return UserInteractService.like(...params)
        },
        cancel: (...params) => {
            return UserInteractService.cancelLike(...params)
        }
    })
}

export function useCollect(collectd: boolean): ActionResult<[number]> {
    return useAction({
        checkLogin: true,
        active: collectd,
        action: (...params) => {
            return UserInteractService.collect(...params)
        },
        cancel: (...params) => {
            return UserInteractService.cancelCollect(...params)
        }
    })
}