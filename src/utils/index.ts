import dayjs from './time'
import { $message } from '@/utils/message.ts'

export * from '@/utils/message.ts'

export function isArray(value: any) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    } else {
        return Object.prototype.toString.call(value) === '[object Array]'
    }
}

export function isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]'
}

export function isNumber(value: any) {
    return !isNaN(Number(value))
}

export function isFunction(value: any) {
    return typeof value == 'function'
}

export function isString(value: any) {
    return typeof value == 'string'
}

export function isBoolean(value: any) {
    return typeof value === 'boolean'
}

export function isEmpty(value: any) {
    if (isArray(value)) {
        return value.length === 0
    }

    if (isObject(value)) {
        return Object.keys(value).length === 0
    }

    return value === '' || value === undefined || value === null
}

/**
 * 判断是否是邮箱 是返回true
 * @param value value
 */
export function isEmail(value: string) {
    let regex = /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
    return !isEmpty(value) && regex.test(value)
}

/**
 * 如果val1为NULL, 返回val2, 否则返回val1
 * @param val1
 * @param val2
 */
export function ifNull<T = any>(val1: any, val2: any): T {
    return isEmpty(val1) ? (val2 as T) : (val1 as T)
}


/**
 * 格式化时间 默认为YYYY-MM-DD HH:mm:ss
 * @param time 时间
 * @param format 格式
 */
export function formatDateTime(time: string | number | Date, format: string = "YYYY-MM-DD HH:mm:ss") {
    return isEmpty(time) ? "N/A" : dayjs(new Date(time)).format(format)
}

export function calculateLocation(ipInfo: IpInfo) {
    if (isEmpty(ipInfo)) return "未知"
    let location = ""
    if (!isEmpty(ipInfo.country)) {
        location = location + ipInfo.country + '-'
    }
    if (ipInfo.province) {
        location = location + ipInfo.province + '-'
    }
    if (ipInfo.city) {
        location += ipInfo.city
    }
    return location;
}

export function calculate(...nums: number[]): number {
    if (isEmpty(nums)) {
        return 0
    }
    return nums.reduce((pre, val, index) => {
        return pre + (isNumber(val) ? val : 0)
    }, 0)
}

export function strToNum(val: string | number): number {
    return typeof val === "string" ? parseInt(val) : val
}

export function onPPT() {
    $message.notifySuccess("暂不支持✿ヽ(°▽°)ノ✿")
}