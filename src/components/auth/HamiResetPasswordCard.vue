<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { isEmail, isEmpty } from '@/utils'
import { $message } from '@/utils/message.ts'
import { EditPen, Lock, Message } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'
import AuthService from '@/service/modules/auth.ts'
import { useAutoLoading, useCountdown, useRequest } from '@/hooks'
import { validateEmail, validatePass, validateRePassword } from '@/utils/validator.ts'
//interface

//router, props, inject, provide
const $router = useRouter();
//custom var
const step = ref<number>(1)
const resetPassForm = ref<FormInstance>()
const resetPassParam = reactive<ResetPassParam>({
    email: "",
    password: "",
    rePassword: "",
    captcha: ""
})

const resetRules = reactive<FormRules<typeof resetPassParam>>({
    email: [{
        trigger: "blur",
        validator: validateEmail,
    }],
    password: [{
        validator: validatePass,
        trigger: "blur"
    }],
    rePassword: [{
        validator: validateRePassword(resetPassParam),
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

const [countdownText, onProcess, startCountdown] = useCountdown({
    interval: 1000,
    originText: '获取验证码',
    time: 60
})

const [onLoading, run] = useAutoLoading()
//是否在注册中
// const [onReset, process] = useAutoLoading()
const [onReset, doResetPass] = useRequest({
    loading: false,
    run: params => AuthService.resetPassword(params)
})
const getCaptcha = async () => {
    if (isEmpty(resetPassParam.email)) {
        return
    }
    //禁用按钮
    onProcess.value = true
    run(AuthService.getCaptcha("reset", resetPassParam.email))
        .then(() => {
            $message.success("发送成功")
            startCountdown()
        })
        .catch(e => {
            console.log(e)
            onProcess.value = false
        })
}
//life cycle

//watch

//fun

const checkEmail = async () => {
    if (!isEmail(resetPassParam.email)) {
        $message.error("请输入正确的邮箱")
        return
    }
    //向后端发请求判断邮箱是否存在
    //todo
    //第二步
    step.value = 2
}

const changeEmail = async () => {
    step.value = 1
}

const handleResetPassword = async (el: FormInstance | undefined) => {
    try {
        await el?.validate()
        doResetPass(resetPassParam)
            .then(() => {
                $message.success("重置密码成功")
                setTimeout(() => {
                    step.value = 3
                }, 1000)
            })
    } catch (e) {
        console.log(e)
    }
}
</script>
<template>
    <div class="hami-reset-password-wrapper">
        <div class="reset-password-body">
            <div class="reset-steps">
                <el-steps :space="200" :active="step" finish-status="success" align-center>
                    <el-step title="确认账号"/>
                    <el-step title="重置密码"/>
                    <el-step title="重置成功"/>
                </el-steps>
            </div>
            <div class="reset-content">
                <template v-if="step === 1">
                    <el-input v-model="resetPassParam.email" size="large">
                        <template #prefix>
                            <span class="email">邮箱</span>
                        </template>
                    </el-input>
                    <el-button type="primary" @click="checkEmail" size="large" class="next-step">下一步</el-button>
                </template>
                <template v-if="step === 2">
                    <el-form :model="resetPassParam" ref="resetPassForm" :rules="resetRules"
                             size="large" @submit.native.prevent class="reset-pass-form">
                        <el-tooltip effect="light"
                                    content="长度为8-16个字符,不能包含空格,必须包含数字,字母或字符至少两种"
                                    placement="right">
                            <el-form-item prop="password">
                                <el-input v-model="resetPassParam.password" type="password" placeholder="密码"
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
                            <el-input v-model="resetPassParam.rePassword" type="password" placeholder="重复密码"
                                      clearable class="password" show-password>
                                <template #prefix>
                                    <el-icon style="font-size: 15px">
                                        <Lock/>
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input v-model="resetPassParam.email" type="text" disabled>
                                <template #prefix>
                                    <el-icon>
                                        <Message/>
                                    </el-icon>
                                </template>
                                <template #suffix>
                                    <span class="email blue" @click="changeEmail">修改</span>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <el-row style="width: 100%" justify="space-between">
                                <el-col :span="15">
                                    <el-input v-model="resetPassParam.captcha" type="text" placeholder="验证码"
                                              class="captcha">
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
                                        {{ countdownText }}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <div class="reset-button">
                            <el-button type="primary" :loading="onReset" @click="handleResetPassword(resetPassForm)">
                                重置密码
                            </el-button>
                        </div>
                    </el-form>
                </template>
                <template v-if="step === 3">
                    <div class="reset-success">
                        重置密码成功
                    </div>
                    <div class="go-login">
                        <el-button type="primary" @click="() => $router.replace('/login')">前往登录</el-button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-reset-password-wrapper {
    width: 960px;
    margin: 0 auto;
    min-height: 400px;
    padding-bottom: 60px;

    .el-input--large {
        font-size: 15px;
    }

    .el-form-item--large {
        margin-bottom: 20px;
    }

    .reset-password-body {
        width: 540px;
        margin: 40px auto 0;
        background-color: #ffffff;
        border-radius: var(--hami-radius-large);
        padding: 20px 20px 24px;
    }

    .reset-content {
        width: 380px;
        margin: 20px auto 0;

        .email {
            font-size: inherit;
            line-height: 20px;
            color: #18191c;
        }

        .blue {
            color: #1d7dfa;
            cursor: pointer;
        }

        .next-step {
            width: 100%;
            margin-top: 24px;
        }

        .el-input--large {
            font-size: 16px;
        }
    }

    .reset-success {
        font-size: 24px;
        margin-bottom: 24px;
        text-align: center;
    }

    .go-login {
        text-align: center;

        button {
            width: 120px;
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

    .reset-button {
        button {
            width: 100%;

        }
    }
}
</style>