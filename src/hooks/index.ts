import { computed, ComputedRef, reactive, Ref, ref, nextTick} from "vue"
import { isEmpty } from '@/utils'
import { UnwrapNestedRefs } from '@vue/reactivity'

export interface CountdownProps {
    originText: string,
    time: number,
    interval: number,
}

type CountdownResult = [
    Ref<string>,
    Ref<boolean>,
    () => Promise<any>
]

export function useCountdown(props: CountdownProps): CountdownResult {
    let origin = props.originText
    const countdownText = ref<string>(origin)
    const onProcess = ref<boolean>(false)
    let interval = Math.max(300, props.interval)
    //启动倒计时方法
    const startCountdown = () => new Promise<void>((resolve, reject) => {
        let time = Math.max(0, props.time)
        countdownText.value = time + ""
        onProcess.value = true
        const timer = setInterval(() => {
            //用户设置onProcess为false, 关闭timer
            if (--time > 0 && onProcess.value) {
                countdownText.value = time + ""
                return
            }
            //倒计时结束设回原来的文本
            countdownText.value = origin
            window.clearInterval(timer)
            onProcess.value = false
            //执行回调
            resolve()
        }, interval)
    })
    return [
        countdownText, onProcess, startCountdown
    ]
}

type AutoLoadingResult = [
    Ref<boolean>,
    <T>(process: Promise<T>) => Promise<T>
]

export function useAutoLoading(loading: boolean = false): AutoLoadingResult {
    const onLoading = ref<boolean>(loading)
    const run = async <T>(process: Promise<T>): Promise<T> => {
        onLoading.value = true
        return process.finally(() => {
            onLoading.value = false
        })
    }
    return [onLoading, run]
}

type TApiFun<TData, TParams extends Array<any>> = (...params: TParams) => Promise<TData>;

type UseRequestProps<TData, TParams extends Array<any>> = {
    loading?: boolean,
    run: TApiFun<TData, TParams>
}

type RequestResult<TData, TParams extends Array<any>> = [Ref<boolean>, TApiFun<TData, TParams>];

export function useRequest<TData, TParams extends any[] = any[]>(props: UseRequestProps<TData, TParams>): RequestResult<TData, TParams> {
    const { loading = false } = props || { loading: false }
    const onRequest = ref<boolean>(loading)
    const process: TApiFun<TData, TParams> = async (...params): Promise<TData> => {
        console.log(params)
        onRequest.value = true
        return props.run(...params)
            .finally(() => {
                setTimeout(() => {
                    onRequest.value = false
                }, 10)
            })
    }
    return [onRequest, process]
}

type TPageQueryFun<T, P extends Array<any>> = (pageParam: PageParam, ...params: P) => Promise<PageData<T>>
type ScrollPage<T, P extends Array<any>> = {
    current: number,
    size: number
    total: number
    init: (...params: P) => void
    hasNext: ComputedRef<boolean>
    next: (...params: P) => Promise<Array<T>>
}
type UsePageProps<T, P extends Array<any>> = {
    size?: number //分页大小
    query: TPageQueryFun<T, P>
}
type ScrollPageResult<T, P extends Array<any>> = [Ref<Boolean>, Ref<ScrollPage<T, P>>, UnwrapNestedRefs<T>[]]

export function useScrollPage<T, P extends any[] = any[]>(props: UsePageProps<T, P>): ScrollPageResult<T, P> {
    const { size = 10 } = props || { size: 10 }
    //@ts-ignore
    const page = ref({
        current: 1,
        size: Math.max(5, size),
        total: 0
    } as ScrollPage<T, P>) as Ref<ScrollPage<T, P>>
    const onRequest = ref(false)
    const inited = ref(false)
    const dataList = reactive<Array<T>>([])

    page.value.hasNext = computed(() => {
        return page.value.current < Math.ceil(page.value.total / page.value.size)
    })
    page.value.init = async (...params: P) => {
        //初始化 调用此方法才会开始分页
        inited.value = false
        _initProps()
        try {
            let data: PageData<T> = await queryNext({
                pageNum: page.value.current,
                pageSize: page.value.size
            }, ...params)
            page.value.total = data.total
            _refreshData(data.data)
            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        } finally {
            inited.value = false
        }
    }
    page.value.next = async (...params: P): Promise<Array<T>> => {
        if (onRequest.value || !page.value.hasNext) {
            return Promise.resolve([])
        }
        page.value.current++
        try {
            let data: PageData<T> = await queryNext({
                pageNum: page.value.current,
                pageSize: page.value.size
            }, ...params)
            _refreshData(data.data)
            if (isEmpty(data.data)) {
                return Promise.reject("null")
            }
            return Promise.resolve(data.data as T[])
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }

    const queryNext: TPageQueryFun<T, P> = async (pageParam: PageParam, ...params): Promise<PageData<T>> => {
        onRequest.value = true
        return props.query(pageParam, ...params)
            .finally(() => {
                onRequest.value = false
            })
    }

    const _initProps = () => {
        //初始化数据
        page.value.size = Math.max(5, size)
        page.value.current = 1
        page.value.total = 0
        dataList.splice(0, dataList.length)
    }

    const _refreshData = (data: T[] | null) => {
        if (!isEmpty(data)) {
            //@ts-ignore
            dataList.push(...data)
        }
    }
    return [onRequest, page, dataList as UnwrapNestedRefs<T>[]]
}
