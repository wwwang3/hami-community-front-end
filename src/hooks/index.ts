import { Ref, ref } from "vue"

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
    const process: TApiFun<TData, TParams> = async (...params) => {
        console.log(params)
        onRequest.value = true
        return props.run(...params)
            .finally(() => {
                onRequest.value = false
            })
    }
    return [onRequest, process]
}
