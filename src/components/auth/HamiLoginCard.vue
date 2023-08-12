<template>
    <div class="hami-login-card">
        <el-form :model="loginParam" ref="loginForm" :rules="loginRules" label-width="80px" size="large"
                 @submit.native.prevent class="hami-login-card-body">
            <el-form-item label="" label-width="0" prop="account" class="login-account">
                <el-input v-model="loginParam.account" size="large" type="text" placeholder="用户名/邮箱" clearable>
                    <template #prefix>
                        <el-icon style="font-size: 15px"><User/></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="" label-width="0" prop="password" class="login-password">
                <el-input v-model="loginParam.password" size="large" :type="type" placeholder="密码">
                    <template #prefix>
                        <el-icon style="font-size: 15px"><Lock/></el-icon>
                    </template>
                    <template #suffix>
                        <HamiEye @change="handleChange" :size="18"></HamiEye>
                        <span class="forget-password">忘记密码?</span>
                    </template>
                </el-input>
            </el-form-item>
            <div class="login-button">
                <el-button type="primary" size="large" @click="login(loginForm)"  :disabled="onLogin">
                    立即登录
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {computed, inject, reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {Lock, User} from '@element-plus/icons-vue'
import {$message} from '@/utils/message.ts'
import HamiEye from '@/components/icon/HamiEye.vue'
import AuthService from '@/service/modules/auth.ts'
import {useTokenStore} from '@/store/modules/token.ts'

const success = inject("success") as Function
const tokenStore = useTokenStore()

const onLogin = ref<boolean>(false)
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
    console.log(showPass.value)
}

const login = async (el: FormInstance | undefined) => {
    onLogin.value = true
    try {
        await el?.validate()
        let result: LoginResult = await AuthService.login(loginParam)
        //登录成功，保存token
        tokenStore.saveToken(result.tokenName, result.tokenValue)
        success("login")
    } catch (e) {
        if (typeof e === "string") {
            $message.error(e)
        }
    } finally {
        setTimeout(() => {
            onLogin.value = false
        }, 2000)
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
            font-size: 15px;
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