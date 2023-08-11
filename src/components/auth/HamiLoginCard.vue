<template>
    <div class="hami-login-card">
        <el-form :model="loginParam" ref="loginForm" :rules="loginRules" label-width="80px" size="large"
                 @submit.native.prevent class="hami-login-card-body">
            <el-form-item label="" label-width="0" prop="account" class="login-account">
                <el-input v-model="loginParam.account" size="large" type="text" placeholder="用户名/邮箱" clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="" label-width="0" prop="password" class="login-password">
                <el-input v-model="loginParam.password" size="large" type="password" placeholder="密码"
                          show-password
                          clearable>
                </el-input>
            </el-form-item>
            <div class="login-card-button">
                <el-button type="primary" size="large" @click="login(loginForm)" color="#1e80ff" :disabled="onLogin">登录</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'

const loginForm = ref<FormInstance>()
const onLogin = ref<boolean>(false)
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


const login = async (el: FormInstance | undefined) => {
    if (!el) return
    onLogin.value = true
    let valid = el.validate()
    if (!valid) {
        onLogin.value = false
        return
    }
    console.log("valid form")
    onLogin.value = false
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

    .login-card-button {
        margin-top: 26px;

        :deep(button) {
            width: 100%;
        }
    }
}
</style>