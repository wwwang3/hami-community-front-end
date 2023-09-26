<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from "vue"
import { useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import UserService from '@/service/modules/user.ts'
import HamiLoading from '@/components/common/HamiLoading.vue'
import { $message } from '@/utils/message.ts'
import defaultAvatar from "/assets/avatar.jpg"
import {
    FormInstance,
    FormRules,
    genFileId,
    UploadInstance,
    UploadProps,
    UploadRawFile,
    UploadRequestOptions
} from 'element-plus'
import user from '@/store/modules/user.ts'
import { isEmpty } from '@/utils'
//interface
//router, props, inject, provide
const $router = useRouter()
//custom var
const [onLoading, getProfile] = useRequest({
    loading: true,
    run: (params) => UserService.getUserProfile()
})

const [onUpdate, handleUpdateProfile] = useRequest({
    loading: false,
    run: (...params) => UserService.updateUserProfile(...params as Parameters<typeof UserService.updateUserProfile>)
})

const [onUpload, handleUpload] = useRequest({
    run: (...params) => UserService.updateAvatar(...params as Parameters<typeof UserService.updateAvatar>)
})

const logined = ref(false)
const userProfileParam = reactive<UserProfileParam>({
    blog: '',
    company: '',
    position: '',
    profile: '',
    username: ''
})

const userProfile = ref<UserProfile>() as Ref<UserProfile>
const avatar = ref(defaultAvatar)
const avatarRef = ref<UploadInstance>()
const userProfileForm = ref<FormInstance>()
const userProfileFormRules = reactive<FormRules<typeof userProfileParam>>({
    // username: [
    //     {
    //         required: true,
    //         message: "用户名不能为空",
    //         trigger: "blur"
    //     },
    //     {
    //         min: 2,
    //         max: 20,
    //         trigger: "blur",
    //         message: "长度在2-20个字符"
    //     }
    // ],
})

onMounted(async () => {
    try {
        userProfile.value = await getProfile(null)
        logined.value = true
        //copy to param
        userProfileParam.username = userProfile.value.username
        userProfileParam.position = userProfile.value.position
        userProfileParam.company = userProfile.value.company
        userProfileParam.blog = userProfile.value.blog
        userProfileParam.profile = userProfile.value.profile
        if (!isEmpty(userProfile.value.avatar)) {
            avatar.value = userProfile.value.avatar
        }
    } catch (e) {
        $message.error("获取账号信息失败")
    }
})

//life cycle

//watch

//fun
const updateProfile = async (el: FormInstance | undefined) => {
    //更新个人信息
    try {
        await el!.validate()
        let profile = getChangedProp()
        if (isEmpty(profile)) {
            return;
        }
        await handleUpdateProfile(profile)
        $message.success("更新成功")
        setTimeout(() => {
            location.reload()
        }, 1000)
    } catch (e) {
        console.log(e)
    }
}

const updateAvatar = async (options: UploadRequestOptions) => {
    //更新头像
    console.log(options)
    try {
        //返回头像地址
        avatar.value = await handleUpload(options.file)
        $message.success("上传成功")
        return Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    } finally {
        avatarRef.value!.clearFiles()
    }
}
const handleExceed: UploadProps['onExceed'] = async (files) => {
    avatarRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    avatarRef.value!.handleStart(file)
}

const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)
    if (!/^.*\.(jpg|jpeg|png|webp)$/i.test(rawFile.name)) {
        $message.error("只支持png, jpg, webp等格式")
        return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
        $message.error("图片最大为5MB")
        return false
    }
    return true
}

const getChangedProp = (): UserProfileParam => {
    let profile = {} as UserProfileParam
    if (userProfileParam.username !== userProfile.value.username) {
        profile.username = userProfileParam.username
    }
    if (userProfileParam.position !== userProfile.value.position) {
        profile.position = userProfileParam.position
    }
    if (userProfileParam.blog !== userProfile.value.blog) {
        profile.blog = userProfileParam.blog
    }
    if (userProfileParam.company !== userProfile.value.company) {
        profile.company = userProfileParam.company
    }
    if (userProfileParam.profile !== userProfile.value.profile) {
        profile.profile = userProfileParam.profile
    }
    return profile
}

</script>
<template>
    <div class="hami-user-profile">
        <el-skeleton :rows="5" animated v-if="onLoading"></el-skeleton>
        <div class="user-profile-container" v-else>
            <div class="user-profile-header">个人资料</div>
            <div class="user-profile-body">
                <div class="profile-form">
                    <el-divider></el-divider>
                    <el-form :model="userProfileParam" ref="userProfileForm" label-width="80px" size="large"
                             :rules="userProfileFormRules"
                             :disabled="onUpdate"
                             @submit.native.prevent class="form">
                        <el-form-item label="用户名" prop="username" class="username">
                            <el-input v-model="userProfileParam.username" size="large" type="text" placeholder="用户名"
                                      minlength="2" maxlength="20" show-word-limit disabled>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="职位" prop="position" class="position">
                            <el-input v-model="userProfileParam.position" size="large" maxlength="50" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="公司" prop="company" class="position">
                            <el-input v-model="userProfileParam.company" size="large" maxlength="50" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="个人主页" prop="blog" class="position">
                            <el-input v-model="userProfileParam.blog" size="large"
                                      maxlength="100" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="个人介绍" prop="profile" class="position">
                            <el-input v-model="userProfileParam.profile" size="large"
                                      type="textarea" rows="4" maxlength="128" show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                    <div class="update-button">
                        <el-button type="primary" size="large" @click="updateProfile(userProfileForm)"
                                   :disabled="onUpdate">
                            保存修改
                        </el-button>
                    </div>
                </div>
                <div class="profile-avatar">
                    <el-upload
                        ref="avatarRef"
                        action="#"
                        name="avatar"
                        :before-upload="handleBeforeUpload"
                        :on-exceed="handleExceed"
                        :http-request="updateAvatar"
                        :limit="1"
                        :show-file-list="false"
                        class="upload"
                        :disabled="onUpload"
                    >
                        <template #default>
                            <HamiLoading :loading="onUpload" text="上传中" style="border-radius: 50%; height: 120px;">
                                <img :src="avatar" alt="">
                            </HamiLoading>
                        </template>
                        <template #trigger>
                            <div class="upload-avatar">
                                <el-button plain :disabled="onUpload">
                                    更换头像
                                </el-button>
                            </div>
                        </template>
                    </el-upload>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-profile {
    padding: 20px 24px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
    min-height: 540px;

    .user-profile-header {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title);
    }

    .user-profile-body {
        display: flex;
        justify-content: space-between;

        .profile-form {
            flex: 1;

            .update-button {
                text-align: center;
            }
        }

        .profile-avatar {
            min-width: 300px;
            padding-left: 60px;
            padding-top: 30px;

            img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
            }

            .upload {
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
            }

            .loading {
                border-radius: 50%;
            }

            .upload-avatar {
                margin-top: 16px;

                button {
                    border-radius: var(--hami-radius-medium);
                }
            }
        }
    }
}


.form {
    margin: 10px 0;

    .username, .position {
        :deep(input) {
            font-size: 16px;
            letter-spacing: 1px;
        }
    }


    .button {
        margin-top: 26px;

        :deep(button) {
            width: 100%;
            background: linear-gradient(135deg, #5efce8, #736efe);
            border: none;
        }
    }
}
</style>