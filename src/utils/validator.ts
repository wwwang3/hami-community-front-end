import { isEmail, isEmpty } from '@/utils/index.ts'

export const validateAccount = (rule: any, value: string, callback: Function) => {
    let regex = /^([a-zA-Z0-9_\u4e00-\u9fa5]{2,16})$/
    if (!regex.test(value)) {
        callback(new Error("2-16个字符,支持中英文,数字,下划线"))
    } else {
        callback()
    }
}
export const validateEmail = (rule: any, value: string, callback: Function) => {
    if (!isEmail(value)) {
        callback(new Error("邮箱格式错误"))
    } else {
        callback()
    }
}
export const validatePass = (rule: any, value: string, callback: Function) => {
    const regex = /^(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$).{8,16}$/
    if (!regex.test(value)) {
        callback(new Error("密码格式错误"))
    }
    callback()
}
export const validateRePassword = <T>(formParam: Pick<RegisterParam | ResetPassParam, "password">) => {
    return (rule: any, value: string, callback: Function) => {
        if (isEmpty(value)) {
            callback(new Error("请输入密码"))
        } else if (value !== formParam.password) {
            callback("两次密码不一致")
        } else {
            callback()
        }
    }
}