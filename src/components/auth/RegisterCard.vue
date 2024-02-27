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
                        <el-button type="primary" :disabled="onProcess" @click="getCaptcha"
                                   size="large"
                                   class="captcha-button" :loading="onLoading">
                            {{ captchaText }}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <div class="register-button" @click="register(registerForm)">
                <el-button :disabled="onRegister" color="#3f4197" v-if="themeStore.isDark">注册</el-button>
                <el-button type="primary" :disabled="onRegister" v-else>注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { isEmail } from '@/utils'
import { $message } from '@/utils/message.ts'
import { EditPen, Lock, Message, User } from '@element-plus/icons-vue'
import { AuthService } from '@/service/modules/user.ts'
import { validateAccount, validateEmail, validatePass, validateRePassword } from '@/utils/validator.ts'
import { useCountdown, useRequest } from '@/hooks'
import { LOGIN_REGISTER_SUCCESS } from '@/store/keys.ts'
import useThemeStore from '@/store/modules/theme.ts'

interface RegisterFormParam extends RegisterParam {
    rePassword: string
}

const themeStore = useThemeStore()
const success = inject<Function>(LOGIN_REGISTER_SUCCESS)
const registerForm = ref<FormInstance>()
const registerParam = reactive<RegisterFormParam>({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    captcha: "",
})
//是否在注册中
const [onRegister, doRegister] = useRequest<any, [RegisterParam]>({
    run: (...params) => AuthService.register(...params)
})

const [onLoading, doGetCaptcha] = useRequest<void, [CaptchaSendParam]>({
    run: (...params) => AuthService.getCaptcha(...params)
})
const [captchaText, onProcess, startCountdown] = useCountdown({
    interval: 1000,
    originText: "获取验证码",
    time: 60
})

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
        validator: validateRePassword(registerParam),
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
    try {
        await el?.validate()
        await doRegister(registerParam)
        $message.success("注册成功")
        setTimeout(() => {
            success?.call(window, "register")
        }, 300)
    } catch (e) {
        if (e !== 'cancel') {
            console.error(e)
            $message.notifyError("注册失败")
        }
    }
}
const getCaptcha = async () => {
    if (!isEmail(registerParam.email)) {
        $message.error("邮箱格式错误")
        return
    }
    //禁用按钮
    onProcess.value = true
    doGetCaptcha({
        email: registerParam.email,
        type: 0
    })
        .then(() => {
            $message.success("发送成功")
            startCountdown()
        })
        .catch(e => {
            console.error(e)
            $message.error(e)
            onProcess.value = false
        })
}
</script>

<style scoped lang="less">
.el-form-item {
    margin-bottom: 16px;
}

.hami-register-card-body {
    margin: 10px 0;

    .el-input--large {
        font-size: 16px;
    }

    .register-button {
        margin-top: 22px;

        button {
            width: 100%;
        }
    }

    .captcha {
        :deep(input) {
            letter-spacing: 1px;
        }
    }

    .captcha-button {
        width: 100%;
    }
}

</style>