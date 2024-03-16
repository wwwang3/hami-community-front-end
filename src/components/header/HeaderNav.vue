<template>
    <div class="page-header-nav">
        <div class="header-nav">
            <router-link class="header-logo" to="/">
                <HamiLogo fit="fill" size="small" :type="themeStore.isDark ? 'logo3' : 'logo2'"></HamiLogo>
            </router-link>
            <div class="header-nav-list">
                <router-link class="header-nav-item" to="/"
                >
                    首页
                </router-link>
                <div class="header-nav-item"
                     @click="onPPT"
                >
                    沸点
                </div>
                <a
                    href="https://github.com/wwwang3/hami-community"
                    target="_blank"
                    class="header-nav-item"
                >
                    项目地址
                </a>
                <div class="header-nav-item"
                     @click="handleAboutClick"
                >
                    关于Hami
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import HamiLogo from '@/components/common/HamiLogo.vue'
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils'
import useThemeStore from '@/store/modules/theme.ts'
import { ref } from 'vue'

const $router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()
const activeNav = ref('首页')

const handleAboutClick = () => {
    $message.success("作者喜欢吃哈密瓜, 所以叫Hami ✿ヽ(°▽°)ノ✿")
}

const onPPT = () => {
    $message.notifySuccess("开发中~~~")
}
</script>

<style scoped lang="less">
.page-header-nav {
    display: flex;
    align-items: center;
    color: var(--hami-text-1);

    .header-logo {
        height: 100%;
        margin-right: 20px;
    }

    .header-nav {
        display: flex;
        align-items: center;
    }

    .header-nav.small {

        .header-logo {
            margin-right: 0;

            :deep(img) {
                height: 31px;
                width: auto;
            }
        }
        .header-nav-list {
            min-width: 60px;
        }
    }

    .header-nav-list {
        display: flex;
        align-items: center;

        .header-nav-item {
            height: 60px;
            padding: 0 1rem;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .header-nav-item.active {
            color: var(--hami-text-hover-color);
        }
    }
}

.header-nav:not(.small) .header-nav-item:hover {
    color: var(--hami-text-hover-color);
    transition: color .3s;
    animation: jump .3s;
}


@keyframes jump {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }

    100% {
        transform: translateY(0);
    }

}
</style>