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
import {computed, reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {Lock, User} from '@element-plus/icons-vue'
import {$message} from '@/utils/message.ts'
import HamiEye from '@/components/icon/HamiEye.vue'

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
        let valid = await el?.validate()
        console.log(valid)
        setTimeout(() => {
            $message.success("登录成功")
        }, 1000)
    } catch (e) {
        console.log(e)
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