import {ElMessage, ElMessageBox, ElLoading, ElNotification} from "element-plus";
import {ElMessageBoxOptions, MessageBoxData} from "element-plus/es/components/message-box/src/message-box.type";
import {LoadingInstance} from "element-plus/lib/components/loading/src/loading";
import {LoadingOptionsResolved} from "element-plus/lib/components/loading/src/types";

import {NotificationParams} from "element-plus/es/components/notification/src/notification";

export interface MessageUtils {
    success(msg: string, duration?: number): void
    error(msg: string, duration?: number): void
    warn(msg: string, duration?: number): void
    info(msg: string, duration?: number): void
    alert(msg: string, title?: string): Promise<MessageBoxData>
    confirm(msg: string, title?: string, type?: string): Promise<MessageBoxData>
    loading(text: string, background?: string, options?: LoadingOptionsResolved): any
    closeLoading(loading: LoadingInstance, time?: number): void
    notify(options: NotificationParams): any
    notifySuccess(msg: string, title?: string, duration?: number, offset?: number,
                  options?: NotificationParams): any
    notifyError(msg: string, title?: string, duration?: number, offset?: number,
                options?: NotificationParams): any
}

export const $message: MessageUtils = {
    success(msg: string, duration: number = 2500) {
        ElMessage({
            type: "success",
            duration: duration,
            message: msg
        })
    },
    error(msg: string, duration: number = 2500) {
        ElMessage({
            type: "error",
            duration: duration,
            message: msg
        })
    },
    warn(msg: string, duration: number = 2500) {
        ElMessage.warning({
            message: msg,
            duration: duration
        })
    },
    info(msg: string, duration: number = 2500) {
        ElMessage.warning({
            message: msg,
            duration: duration
        })
    },
    alert(msg: string, title: string = "提示"): Promise<MessageBoxData> {
        return ElMessageBox.alert(msg, title, {
            confirmButtonText: "确定",
            autofocus: false
        })
    },
    confirm(msg: string, title="提示", type = "error"): Promise<MessageBoxData> {
        return ElMessageBox.confirm(msg, title, {
            autofocus: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type
        } as ElMessageBoxOptions, null)
    },
    loading(text: string = "加载中", background: string = "rgba(233, 233, 233, .8)",
            options?: LoadingOptionsResolved) {
        return ElLoading.service({
            text: text,
            background: background,
            ...options
        })
    },
    closeLoading(loading: LoadingInstance, time: number = 10) {
        if (loading !== null) {
            setTimeout(() => {
                loading.close()
            }, time)
        }
    },
    notifySuccess(msg: string, title: string = "通知", duration: number = 2500, offset: number = 0,
                  options?: NotificationParams) {
        return this.notify({
            type: "success",
            title: title,
            message: msg,
            offset: offset,
            duration: duration,
            ...options as {}
        })
    },
    notifyError(msg: string, title: string = "通知", duration: number = 2500, offset: number = 0,
                options?: NotificationParams) {
        return this.notify({
            type: "error",
            title: title,
            message: msg,
            offset: offset,
            duration: duration,
            ...options as {}
        })
    },
    notify(options: NotificationParams) {
        return ElNotification(options)
    }
}