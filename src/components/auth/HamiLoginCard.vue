<template>
    <div class="hami-login-card">
        <el-form :model="loginParam" ref="loginForm" :rules="loginRules" label-width="80px" size="large"
                 @submit.native.prevent class="hami-login-card-body">
            <el-form-item label="" label-width="0" prop="account" class="login-account">
                <el-input v-model="loginParam.account" size="large" type="text" placeholder="用户名/邮箱" clearable>
                    <template #prefix>
                        <el-icon style="font-size: 15px">
                            <User/>
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="" label-width="0" prop="password" class="login-password">
                <el-input v-model="loginParam.password" size="large" :type="type" placeholder="密码">
                    <template #prefix>
                        <el-icon style="font-size: 15px">
                            <Lock/>
                        </el-icon>
                    </template>
                    <template #suffix>
                        <HamiEye @change="handleChange" :size="18"></HamiEye>
                        <span class="forget-password" @click="() => $router.replace('/reset-pass')">忘记密码?</span>
                    </template>
                </el-input>
            </el-form-item>
            <div class="login-button">
                <el-button type="primary" size="large" @click="login(loginForm)" :disabled="onLogin">
                    立即登录
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import HamiEye from '@/components/icon/HamiEyeIcon.vue'
import { useTokenStore } from '@/store/modules/token.ts'
import { useRequest } from '@/hooks'

const success = inject("success") as Function
const tokenStore = useTokenStore()

const [onLogin, handleLogin] = useRequest({
    run: (params) => tokenStore.login(params)
})
const showPass = ref(false)
const loginForm = ref<FormInstance>()
const loginParam = reactive<LoginParam>({
    account: "",
    password: ""
})
const loginRules = reactive<FormRules<LoginParam>>({
    account: [{
        required: true,
        message: "账号不能为空",
        trigger: "blur"
    }],
    password: [{
        required: true,
        message: "密码不能为空",
        trigger: "blur"
    }]
})
const type = computed(() => {
    return showPass.value ? "text" : "password"
})
const handleChange = (open: boolean) => {
    showPass.value = open
}

const login = async (el: FormInstance | undefined) => {
    try {
        await el?.validate()
        //登录
        handleLogin(loginParam)
            .then(() => {
                $message.success("登录成功")
                setTimeout(() => {
                    success("login")
                }, 1000)
            })
            .catch(e => {
                $message.error(e)
            })
    } catch (e) {
    }
}

</script>

<style scoped lang="less">
.el-form-item--large {
    margin-bottom: 24px;
}

.hami-login-card-body {
    margin: 10px 0;

    .login-account, .login-password {
        :deep(input) {
            font-size: 16px;
            letter-spacing: 1px;
        }
    }

    .forget-password {
        margin-left: 4px;
        color: #00a1d6;
        font-size: 13px;
        cursor: pointer;
    }

    .login-button {
        margin-top: 26px;

        :deep(button) {
            width: 100%;
            background: linear-gradient(135deg, #5efce8, #736efe);
            border: none;
        }
    }
}
</style>