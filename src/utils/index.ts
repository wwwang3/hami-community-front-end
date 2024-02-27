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
export function formatDateTime(time: string | number | Date | undefined, format: string = "YYYY-MM-DD HH:mm:ss") {
    return isEmpty(time) ? "N/A" : dayjs(new Date(time!)).format(format)
}

export function formatRelativeTime(time: string | number | Date) {
    // 将时间戳转换为JavaScript Date对象
    let date = new Date(time);

    // 计算与当前时间的差异（单位：毫秒）
    let differenceInMs = Date.now() - date.getTime();
    // 计算差异对应的各个时间单位
    let seconds = Math.floor(differenceInMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    // 根据差异生成相对时间描述
    if (days > 13) {
        // 超过14天显示具体日期
        return formatDateTime(date, "YYYY-MM-DD")
    } else if (days === 1) {
        return "昨天";
    } else if (days >= 2) {
        return days + "天前";
    } else if (hours >= 1) {
        return hours + "小时前";
    } else if (minutes >= 1) {
        return minutes + "分钟前";
    } else {
        return "刚刚";
    }
}

export function formatNumber(num: number | undefined) {
    if (num === undefined) return 0
    if (num > 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num + ''
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

export function onPPT(title?: string) {
    $message.notifySuccess("暂不支持✿ヽ(°▽°)ノ✿", title)
}