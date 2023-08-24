<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { FormInstance, FormRules } from 'element-plus'
import { validatePass } from '@/utils/validator.ts'
import { useAutoLoading, useCountdown, useRequest } from '@/hooks'
import AuthService from '@/service/modules/auth.ts'
import { isEmail, isEmpty } from '@/utils'
import { $message } from '@/utils/message.ts'
import { EditPen, Lock, Message } from '@element-plus/icons-vue'
//interface
const $props = defineProps<{
    email: string,
}>()
const $emits = defineEmits<{
    (e: 'success'): any,
    (e: 'cancel'): any
}>()
const resetPassForm = ref<FormInstance>()
const resetPassParam = reactive<ResetPassParam>({
    email: $props.email,
    password: "",
    captcha: ""
})

const resetRules = reactive<FormRules<typeof resetPassParam>>({
    password: [{
        validator: validatePass,
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

const [countdownText, onCountDown, startCountdown] = useCountdown({
    interval: 1000,
    originText: '获取验证码',
    time: 60
})

const [onLoading, run] = useAutoLoading()
//是否在注册中
// const [onReset, process] = useAutoLoading()
const [onReset, doResetPass] = useRequest({
    loading: false,
    run: params => AuthService.updatePassword(params)
})
const getCaptcha = async () => {
    if (isEmpty(resetPassParam.email)) {
        return
    }
    //禁用按钮
    onCountDown.value = true
    run(AuthService.getCaptcha("update", resetPassParam.email))
        .then(() => {
            $message.success("发送成功")
            startCountdown()
        })
        .catch(e => {
            console.log(e)
            onCountDown.value = false
        })
}

const handleResetPassword = async (el: FormInstance | undefined) => {
    try {
        await el?.validate()
        doResetPass(resetPassParam)
            .then(() => {
                $message.success("重置密码成功")
                $emits("success")
            })
    } catch (e) {
        console.log(e)
    }
}

const cancel = () => {
    $emits('cancel')
}
</script>
<template>
    <el-form :model="resetPassParam" ref="resetPassForm" :rules="resetRules"
             size="large" @submit.native.prevent class="reset-pass-form">
        <el-form-item prop="email">
            <el-input v-model="resetPassParam.email" type="text" disabled>
                <template #prefix>
                    <el-icon>
                        <Message/>
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-tooltip effect="light"
                    content="长度为8-16个字符,不能包含空格,必须包含数字,字母或字符至少两种"
                    placement="right">
            <el-form-item prop="password">
                <el-input v-model="resetPassParam.password" type="password" placeholder="新密码"
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
        <el-form-item prop="captcha" class="captcha">
            <el-input v-model="resetPassParam.captcha" type="text" placeholder="验证码" class="item">
                <template #prefix>
                    <el-icon>
                        <EditPen/>
                    </el-icon>
                </template>
            </el-input>
            <el-button type="primary" :disabled="onCountDown" @click="getCaptcha"
                       size="large"
                       class="captcha-button" :loading="onLoading">
                {{ countdownText }}
            </el-button>
        </el-form-item>
        <div class="reset-button">
            <el-button plain @click="cancel">取消</el-button>
            <el-button type="primary" :loading="onReset" @click="handleResetPassword(resetPassForm)">
                重置
            </el-button>
        </div>
    </el-form>
</template>

<style scoped lang="less">
.el-input--large {
    font-size: 16px;
}

.reset-button {
    text-align: center;

    button {
        width: 120px;
    }

}

.captcha {
    :deep(.el-form-item__content) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .item {
        flex: 1;
    }

    .captcha-button {
        margin-left: 20px;
        min-width: 100px;
    }


}
</style>