<template>
    <el-dropdown trigger="click" @command="onCommand">
        <div class="operation-warp">
            <u-icon size="18">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z"
                        fill="currentColor"
                    ></path>
                </svg>
            </u-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="report">举报</el-dropdown-item>
                <el-dropdown-item command="remove" v-if="showRemove">删除</el-dropdown-item>
                <el-dropdown-item divided command="copy">复制</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { CommentApi, ElDropdown, ElDropdownItem, ElDropdownMenu, UIcon } from 'undraw-ui'
import useUserStore from '@/store/modules/user.ts'
import { computed, inject } from 'vue'
import { isEmpty, onPPT } from '@/utils'
import { COMMENT_AREA_OWNER } from '@/store/keys.ts'
import { $message } from '@/utils/message.ts'

interface Props {
    comment: CommentApi
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'remove', comment: CommentApi): void
}>()

const { copy } = useClipboard()
const userStore = useUserStore()
const loginUser = userStore.userInfo
const comment_area_owner = inject<User>(COMMENT_AREA_OWNER)

const onCommand = (command: any) => {
    switch(command) {
        //自己发表的评论可以删除
        //评论区owner可以删除评论
        case 'remove':
            emit('remove', props.comment)
            break
        case 'report':
            onPPT()
            break
        case 'copy':
            copy(props.comment.content)
            $message.success("复制成功")
    }
}


const showRemove = computed(() => {
    //发表评论该评论的用户ID
    let commentUser = props.comment.uid
    if (!isEmpty(loginUser) && commentUser == loginUser.userId) {
        return true
    }
    return loginUser.userId == comment_area_owner?.userId;
})
</script>

<style lang="less" scoped>
.el-dropdown {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
.operation-warp {
    font-size: 16px;
    color: #9499a0;
    cursor: pointer;
    position: relative;
}
.operation-warp:hover {
    color: #00aeec;
}
</style>