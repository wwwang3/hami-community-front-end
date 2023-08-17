<template>
    <div class="hami-register-card">
        <el-form :model="registerParam" ref="registerForm" :rules="registerRules"
                 size="large" @submit.native.prevent class="hami-register-card-body">
            <el-form-item prop="username">
                <el-input v-model="registerParam.username" type="text" placeholder="用户名" clearable>
                    <template #prefix>
                        <el-icon style="font-size: 15px">
                            <User/>
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-tooltip effect="light" content="长度为8-16个字符,不能包含空格,必须包含数字,字母或字符至少两种"
                        placement="right">
                <el-form-item prop="password">
                    <el-input v-model="registerParam.password" type="password" placeholder="密码"
                              show-password
                              clearable>
                        <template #prefix>
                            <el-icon style="font-size: 15px">
                                <Lock/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-tooltip>
            <el-form-item prop="rePassword">
                <el-input v-model="registerParam.rePassword" type="password" placeholder="重复密码"
                          clearable class="password" show-password>
                    <template #prefix>
                        <el-icon style="font-size: 15px">
                            <Lock/>
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="registerParam.email" type="text" placeholder="请输入邮箱" clearable>
                    <template #prefix>
                        <el-icon>
                            <Message/>
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <el-row style="width: 100%" justify="space-between">
                    <el-col :span="15">
                        <el-input v-model="registerParam.captcha" type="text" placeholder="验证码" class="captcha">
                            <template #prefix>
                                <el-icon>
                                    <EditPen/>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" :disabled="onGetCaptcha" @click="getCaptcha"
                                   size="large"
                                   class="captcha-button">
                            {{ captchaText }}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <div class="register-button" @click="register(registerForm)">
                <el-button type="primary" :disabled="onRegister">注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {inject, reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {isEmpty} from '@/utils'
import {$message} from '@/utils/message.ts'
import {useRoute, useRouter} from 'vue-router'
import {EditPen, Lock, Message, User} from '@element-plus/icons-vue'
import AuthService from '@/service/modules/auth.ts'

const $route = useRoute()
const $router = useRouter()
const success = inject("success") as Function
const registerForm = ref<FormInstance>()
const registerParam = reactive<RegisterParam>({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    captcha: "",
})
//是否在注册中
const onRegister = ref<boolean>(false)
const onGetCaptcha = ref<boolean>(false)
const captchaText = ref<string>("获取验证码")
const validateAccount = (rule: any, value: string, callback: Function) => {
    let regex = /^([a-zA-Z0-9_\u4e00-\u9fa5]{2,16})$/
    if (!regex.test(value)) {
        callback(new Error("2-16个字符,支持中英文,数字,下划线"))
    } else {
        callback()
    }
}
const validateEmail = (rule: any, value: string, callback: Function) => {
    let regex = /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
    if (isEmpty(value) || !regex.test(value)) {
        callback(new Error("邮箱格式错误"))
    } else {
        callback()
    }
}
const validatePass = (rule: any, value: string, callback: Function) => {
    const regex = /^(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$).{8,16}$/
    if (!regex.test(value)) {
        callback(new Error("密码格式错误"))
    }
    callback()
}
const validateCheckPass = (rule: any, value: string, callback: Function) => {
    if (isEmpty(value)) {
        callback(new Error("请输入密码"))
    } else if (value !== registerParam.password) {
        callback("两次密码不一致")
    } else {
        callback()
    }
}

const registerRules = reactive<FormRules<typeof registerParam>>({
    username: [{
        validator: validateAccount,
        trigger: "blur"
    }],
    email: [{
        trigger: "blur",
        validator: validateEmail,
    }],
    password: [{
        validator: validatePass,
        trigger: "blur"
    }],
    rePassword: [{
        validator: validateCheckPass,
        trigger: "blur"
    }],
    captcha: [{
        required: true,
        min: 6,
        max: 6,
        message: "请输入六位验证码",
        trigger: "blur"
    }]
})

const register = async (el: FormInstance | undefined) => {
    onRegister.value = true
    try {
        await el?.validate()
        await AuthService.register(registerParam)
        $message.success("注册成功")
        setTimeout(() => {
            success("register")
        }, 300)
    } catch (e) {
        console.log(e)
    } finally {
        setTimeout(() => {
            onRegister.value = false
        }, 2000)
    }
}

const startCountDown = (t: number, callback: Function) => {
    let time = Math.min(t, 60)
    captchaText.value = `${time}`
    const timer = setInterval(() => {
        time--
        if (time === 0) {
            window.clearInterval(timer)
            callback()
        } else {
            captchaText.value = `${time}`
        }
    }, 1000)
    return timer
}
const getCaptcha = async () => {
    let timer = undefined
    let callback = () => {
        captchaText.value = "获取验证码"
        onGetCaptcha.value = false
    }
    try {
        //禁用按钮
        onGetCaptcha.value = true
        timer = startCountDown(60, callback)
        await AuthService.getCaptcha("register", registerParam.email)
    } catch (e) {
        //出错了删除
        callback()
        window.clearInterval(timer)
        $message.error("获取失败")
    }
}
</script>

<style scoped lang="less">
.el-form-item {
    margin-bottom: 20px;
}

.hami-register-card-body {
    //--el-component-size: 34px;
    margin: 10px 0;
    .el-input--large {
        font-size: 16px;
    }
    .register-button {
        margin-top: 22px;

        :deep(button) {
            width: 100%;
            background: linear-gradient(135deg, #736efe, #5efce8);
            border: none;
        }
    }

    .captcha {
        :deep(input) {
            letter-spacing: 1px;
        }
    }

    .captcha-button {
        width: 100%;
        //height: 34px;
    }
}

</style>