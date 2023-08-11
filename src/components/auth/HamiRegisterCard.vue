<template>
    <div class="hami-register-card">
        <el-form :model="registerParam" ref="registerForm" :rules="registerRules" label-position="left"
                 label-width="80px" size="large" @submit.native.prevent class="hami-register-body">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerParam.username" size="large" type="text" placeholder="用户名" clearable>
                </el-input>
            </el-form-item>
            <el-tooltip effect="light" content="长度为8-16个字符,不能包含空格,必须包含数字,字母或字符至少两种" placement="right">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerParam.password" size="large" type="password" placeholder="密码"
                              show-password
                              clearable>
                    </el-input>
                </el-form-item>
            </el-tooltip>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input v-model="registerParam.rePassword" size="large" type="password" placeholder="请再次输入密码"
                          clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerParam.email" size="large" type="text" placeholder="请输入邮箱" clearable>
                </el-input>
            </el-form-item>
            <div class="hami-register-button" @click="register(registerForm)">
                <el-button type="primary" :disabled="onRegister">注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {isEmpty} from '@/utils'

const registerForm = ref<FormInstance>()

const registerParam = reactive<RegisterParam>({
    username: '',
    email: '',
    password: '',
    rePassword: ''
})
//是否在注册中
const onRegister = ref<boolean>(false)

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
    }]
})

const register = async (el: FormInstance | undefined) => {
    onRegister.value = true
    if (!el) return
    let valid = await el.validate()
    if (valid) {
        console.log("valid")
    }
    onRegister.value = false
}
</script>

<style scoped lang="less">
.hami-register-card-body {
    margin: 10px 0;
}
</style>