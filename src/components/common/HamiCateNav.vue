<script setup lang="ts">
import { useRouter } from "vue-router"
import { CateRoutePath } from '@/store/modules/category.ts'

const $props = defineProps({
    activePath: {
        default: '/recommend',
        type: String
    }
})
const $router = useRouter()
const handleClick = (path: CateRoutePath) => {
    window.scrollTo({
        top: 0
    })
    $router.replace(path)
}
</script>
<template>
    <div class="nav-cate card">
        <div class="nav-cate-item" @click="handleClick('/follow')"
             :class="{active: activePath === '/follow'}">
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg" data-v-c73c64f2="">
                    <path
                        d="M11.5903 8.19043C11.5542 8.11425 11.4458 8.11425 11.4097 8.19043L10.4041 10.31C10.3898 10.3401 10.3615 10.3611 10.3287 10.366L8.19408 10.6887C8.11329 10.7009 8.08045 10.7996 8.13783 10.8578L9.68325 12.4248C9.70571 12.4476 9.71592 12.4798 9.71072 12.5113L9.33377 14.7975C9.32021 14.8798 9.4073 14.9415 9.48042 14.9015L11.452 13.8233C11.4819 13.8069 11.5181 13.8069 11.548 13.8233L13.5196 14.9015C13.5927 14.9415 13.6798 14.8798 13.6662 14.7975L13.2893 12.5113C13.2841 12.4798 13.2943 12.4476 13.3168 12.4248L14.8622 10.8578C14.9195 10.7996 14.8867 10.7009 14.8059 10.6887L12.6713 10.366C12.6385 10.3611 12.6102 10.3401 12.5959 10.31L11.5903 8.19043Z"
                        fill="currentColor" data-v-c73c64f2=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12.7568 1.3335C13.4239 1.3335 13.9641 1.86183 13.9983 2.52111L14 2.58746V6.34783V9.44263L13.7881 9.41059C13.6565 9.39071 13.5435 9.30673 13.4865 9.18654L11.8614 5.76125C11.7168 5.45652 11.2832 5.45652 11.1386 5.76125L9.51354 9.18654C9.45652 9.30673 9.34347 9.39071 9.21193 9.41059L5.77633 9.92991C5.45315 9.97876 5.32181 10.3736 5.55131 10.6063L8.04943 13.1394C8.13927 13.2305 8.18011 13.3591 8.1593 13.4853L7.90953 15.0002H5.42606H3.24324C2.57608 15.0002 2.03587 14.4718 2.00171 13.8125L2 13.7462V2.58746C2 1.91989 2.51869 1.37002 3.17696 1.33524L3.24324 1.3335H12.7568ZM7.33333 7.00017C7.33333 6.81608 7.18409 6.66684 7 6.66684H5C4.8159 6.66684 4.66666 6.81608 4.66666 7.00017V7.66684C4.66666 7.85093 4.8159 8.00017 5 8.00017H7C7.18409 8.00017 7.33333 7.85093 7.33333 7.66684V7.00017ZM9.66666 4.00017C9.85076 4.00017 10 4.14941 10 4.3335V5.00017C10 5.18426 9.85076 5.3335 9.66666 5.3335H5C4.8159 5.3335 4.66666 5.18426 4.66666 5.00017V4.3335C4.66666 4.14941 4.8159 4.00017 5 4.00017H9.66666Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">关注</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/recommend')"
             :class="{active: activePath === '/recommend'}">
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M0.666016 8.00033C0.666016 12.0504 3.94926 15.3337 7.99935 15.3337C12.0494 15.3337 15.3327 12.0504 15.3327 8.00033C15.3327 3.95024 12.0494 0.666992 7.99935 0.666992C3.94926 0.666992 0.666016 3.95024 0.666016 8.00033ZM5.43709 11.0048L9.3392 9.34286L11.0037 5.43876C11.0397 5.35428 11.0393 5.25869 11.0025 5.17455C10.9288 5.00586 10.7323 4.92887 10.5636 5.00259L6.68535 6.69744L5.00087 10.565C4.96428 10.649 4.96389 10.7444 4.9998 10.8287C5.07193 10.9981 5.26772 11.0769 5.43709 11.0048Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">综合</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/backend')"
             :class="{active: activePath === '/backend'}"
        >
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M2 2C1.44772 2 1 2.44772 1 3V11C1 11.5523 1.44772 12 2 12H14C14.5523 12 15 11.5523 15 11V3C15 2.44772 14.5523 2 14 2H2ZM4.5 7C4.22386 7 4 7.22386 4 7.5V9.5C4 9.77614 4.22386 10 4.5 10H5C5.27614 10 5.5 9.77614 5.5 9.5V7.5C5.5 7.22386 5.27614 7 5 7H4.5ZM7 5C7 4.72386 7.22386 4.5 7.5 4.5H8C8.27614 4.5 8.5 4.72386 8.5 5V9.5C8.5 9.77614 8.27614 10 8 10H7.5C7.22386 10 7 9.77614 7 9.5V5ZM10.5 6C10.2239 6 10 6.22386 10 6.5V9.5C10 9.77614 10.2239 10 10.5 10H11C11.2761 10 11.5 9.77614 11.5 9.5V6.5C11.5 6.22386 11.2761 6 11 6H10.5Z"
                          fill="currentColor"></path>
                    <rect data-v-c73c64f2="" x="3" y="13" width="10" height="1.3" rx="0.5"
                          fill="currentColor"></rect>
                </svg>
            </el-icon>
            <span class="name">后端</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/front-end')"
             :class="{active: activePath === '/front-end'}"
        >
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M2 2C1.44772 2 1 2.44772 1 3V6H15V3C15 2.44772 14.5523 2 14 2H2ZM15 7.3H1V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V7.3ZM8.65811 8.02566C8.92009 8.11298 9.06167 8.39614 8.97434 8.65811L7.97434 11.6581C7.88702 11.9201 7.60386 12.0617 7.34189 11.9743C7.07991 11.887 6.93833 11.6039 7.02566 11.3419L8.02566 8.34189C8.11298 8.07991 8.39614 7.93833 8.65811 8.02566ZM3.5 5C3.77614 5 4 4.77614 4 4.5C4 4.22386 3.77614 4 3.5 4C3.22386 4 3 4.22386 3 4.5C3 4.77614 3.22386 5 3.5 5ZM5.5 4.5C5.5 4.77614 5.27614 5 5 5C4.72386 5 4.5 4.77614 4.5 4.5C4.5 4.22386 4.72386 4 5 4C5.27614 4 5.5 4.22386 5.5 4.5ZM6.5 5C6.77614 5 7 4.77614 7 4.5C7 4.22386 6.77614 4 6.5 4C6.22386 4 6 4.22386 6 4.5C6 4.77614 6.22386 5 6.5 5ZM6.44721 8.77639C6.57071 9.02338 6.4706 9.32372 6.22361 9.44721L5.11803 10L6.22361 10.5528C6.4706 10.6763 6.57071 10.9766 6.44721 11.2236C6.32372 11.4706 6.02338 11.5707 5.77639 11.4472L3.77639 10.4472C3.607 10.3625 3.5 10.1894 3.5 10C3.5 9.81061 3.607 9.63748 3.77639 9.55279L5.77639 8.55279C6.02338 8.42929 6.32372 8.5294 6.44721 8.77639ZM9.77639 9.44721C9.5294 9.32372 9.42929 9.02338 9.55279 8.77639C9.67628 8.5294 9.97662 8.42929 10.2236 8.55279L12.2236 9.55279C12.393 9.63748 12.5 9.81061 12.5 10C12.5 10.1894 12.393 10.3625 12.2236 10.4472L10.2236 11.4472C9.97662 11.5707 9.67628 11.4706 9.55279 11.2236C9.42929 10.9766 9.5294 10.6763 9.77639 10.5528L10.882 10L9.77639 9.44721Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">前端</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/android')"
             :class="{active: activePath === '/android'}"
        >
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <rect x="5.69922" y="12" width="1.3" height="3" rx="0.5"
                          fill="currentColor"></rect>
                    <rect x="1" y="6" width="1.3" height="6" rx="0.5"
                          fill="currentColor"></rect>
                    <rect x="13.6992" y="6" width="1.3" height="6" rx="0.5"
                          fill="currentColor"></rect>
                    <rect x="9" y="12" width="1.3" height="3" rx="0.5"
                          fill="currentColor"></rect>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 5.36364V12C13 12.5523 12.5523 13 12 13H4C3.44772 13 3 12.5523 3 12V5.36364V5.27273C3 5.24067 3.00151 5.20897 3.00446 5.17768C3.11608 2.85397 5.30996 1 8 1C10.69 1 12.8839 2.85397 12.9955 5.17768C12.9985 5.20897 13 5.24067 13 5.27273V5.36364ZM7 5.75C7 6.16421 6.66421 6.5 6.25 6.5C5.83579 6.5 5.5 6.16421 5.5 5.75C5.5 5.33579 5.83579 5 6.25 5C6.66421 5 7 5.33579 7 5.75ZM9.75 6.5C10.1642 6.5 10.5 6.16421 10.5 5.75C10.5 5.33579 10.1642 5 9.75 5C9.33579 5 9 5.33579 9 5.75C9 6.16421 9.33579 6.5 9.75 6.5Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">Android</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/ios')"
             :class="{active: activePath === '/ios'}"
        >
            <el-icon class="icon fix-ios" size="18">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.822 8.4388C11.8045 6.66562 13.268 5.81556 13.3331 5.77312C12.5106 4.56956 11.2296 4.40506 10.7733 4.38581C9.68308 4.27556 8.64621 5.02763 8.09277 5.02763C7.54108 5.02763 6.68708 4.402 5.78277 4.41863C4.59452 4.43613 3.49858 5.10944 2.88696 6.17387C1.65233 8.3163 2.57064 11.4899 3.77421 13.2277C4.36221 14.0782 5.06352 15.0332 5.98402 14.9991C6.87039 14.9637 7.20596 14.4255 8.27739 14.4255C9.34883 14.4255 9.65027 14.9991 10.5887 14.9816C11.5425 14.9637 12.1471 14.1149 12.7311 13.2618C13.4062 12.2752 13.6845 11.3197 13.7006 11.2707C13.6796 11.2611 11.8404 10.5567 11.822 8.4388ZM10.0593 3.23563C10.548 2.64281 10.8779 1.82031 10.7878 1C10.0838 1.02888 9.23071 1.469 8.72583 2.06006C8.27258 2.58463 7.87621 3.422 7.98252 4.22613C8.76827 4.28737 9.57021 3.82669 10.0593 3.23563Z"
                        fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">IOS</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/ai')"
             :class="{active: activePath === '/ai'}"
        >
            <el-icon class="icon fix-ai" size="18">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="8" width="1.3" height="5" rx="0.5"
                          fill="currentColor"></rect>
                    <rect x="14" y="8" width="1.3" height="5" rx="0.5"
                          fill="currentColor"></rect>
                    <rect x="7.5" y="4" width="1" height="3" rx="0.5"
                          fill="currentColor"></rect>
                    <circle cx="8" cy="2" r="1" fill="currentColor"></circle>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M3 7C3 6.44772 3.44772 6 4 6H12C12.5523 6 13 6.44772 13 7V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V7ZM7 10.75C7 11.1642 6.66421 11.5 6.25 11.5C5.83579 11.5 5.5 11.1642 5.5 10.75C5.5 10.3358 5.83579 10 6.25 10C6.66421 10 7 10.3358 7 10.75ZM9.75 11.5C10.1642 11.5 10.5 11.1642 10.5 10.75C10.5 10.3358 10.1642 10 9.75 10C9.33579 10 9 10.3358 9 10.75C9 11.1642 9.33579 11.5 9.75 11.5Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">人工智能</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/tool')"
             :class="{active: activePath === '/tool'}"
        >
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_20616_81506)">
                        <path
                            d="M14.212 4.54986L13.497 5.26886C13.3158 5.45088 13.1005 5.59531 12.8633 5.69386C12.6261 5.79242 12.3718 5.84315 12.115 5.84315C11.8582 5.84315 11.6039 5.79242 11.3667 5.69386C11.1295 5.59531 10.9142 5.45088 10.733 5.26886C10.3664 4.89915 10.1606 4.39955 10.1606 3.87886C10.1606 3.35817 10.3664 2.85857 10.733 2.48886L11.448 1.76986C11.843 1.37286 11.579 0.90486 10.868 1.01686C10.028 1.14786 9.262 1.57586 8.709 2.22286C8.005 2.91786 7.682 4.16486 7.922 5.31786L1.927 11.3469C1.56096 11.7165 1.35562 12.2157 1.35562 12.7359C1.35562 13.2561 1.56096 13.7552 1.927 14.1249C2.10804 14.307 2.32329 14.4515 2.56038 14.5501C2.79747 14.6487 3.05172 14.6995 3.3085 14.6995C3.56528 14.6995 3.81953 14.6487 4.05662 14.5501C4.29371 14.4515 4.50896 14.307 4.69 14.1249L10.686 8.09486C11.2693 8.2189 11.8745 8.19473 12.446 8.02459C13.0176 7.85444 13.5375 7.54373 13.958 7.12086C14.5581 6.51861 14.9243 5.72244 14.991 4.87486C15.071 4.41886 14.607 4.15286 14.212 4.54986ZM3.768 13.1979C3.67659 13.2885 3.56041 13.35 3.4341 13.3747C3.30779 13.3994 3.17699 13.3861 3.05819 13.3366C2.93939 13.2871 2.8379 13.2036 2.76651 13.0965C2.69511 12.9894 2.65701 12.8636 2.657 12.7349C2.65647 12.5618 2.72462 12.3957 2.84649 12.2729C2.96836 12.1501 3.13399 12.0807 3.307 12.0799C3.487 12.0799 3.651 12.1529 3.768 12.2719C3.888 12.3889 3.96 12.5539 3.96 12.7349C3.9604 12.8209 3.94363 12.9062 3.91066 12.9857C3.87769 13.0652 3.82919 13.1373 3.768 13.1979ZM3.118 4.66786L5.377 6.93986L6.297 6.01286L4.04 3.74286L3.535 2.77086L1.92 1.61186L1 2.53986L2.151 4.16086L3.118 4.66786ZM10.672 9.48586C10.642 9.45526 10.6062 9.43095 10.5667 9.41436C10.5272 9.39776 10.4848 9.38921 10.442 9.38921C10.3992 9.38921 10.3568 9.39776 10.3173 9.41436C10.2778 9.43095 10.242 9.45526 10.212 9.48586L8.83 10.8759C8.79955 10.9062 8.7754 10.9423 8.75891 10.982C8.74243 11.0218 8.73395 11.0644 8.73395 11.1074C8.73395 11.1504 8.74243 11.193 8.75891 11.2327C8.7754 11.2724 8.79955 11.3085 8.83 11.3389L12.09 14.6169C12.2106 14.7383 12.3541 14.8348 12.5122 14.9006C12.6703 14.9663 12.8398 15.0002 13.011 15.0002C13.1822 15.0002 13.3517 14.9663 13.5098 14.9006C13.6679 14.8348 13.8114 14.7383 13.932 14.6169C14.442 14.1049 14.442 13.2769 13.932 12.7639L10.672 9.48586Z"
                            fill="currentColor"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_20616_81506">
                            <rect width="14" height="14" fill="white"
                                  transform="translate(1 1)"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </el-icon>
            <span class="name">开发工具</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/coding')"
             :class="{active: activePath === '/coding'}"
        >
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M1 2C1 1.44772 1.44772 1 2 1H14C14.5523 1 15 1.44772 15 2V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14V2ZM3 4.5C3 4.22386 3.22386 4 3.5 4H12.5C12.7761 4 13 4.22386 13 4.5V4.8C13 5.07614 12.7761 5.3 12.5 5.3H3.5C3.22386 5.3 3 5.07614 3 4.8V4.5ZM3.5 7C3.22386 7 3 7.22386 3 7.5V7.8C3 8.07614 3.22386 8.3 3.5 8.3H4.5C4.77614 8.3 5 8.07614 5 7.8V7.5C5 7.22386 4.77614 7 4.5 7H3.5ZM7 7.5C7 7.22386 7.22386 7 7.5 7H8.5C8.77614 7 9 7.22386 9 7.5V7.8C9 8.07614 8.77614 8.3 8.5 8.3H7.5C7.22386 8.3 7 8.07614 7 7.8V7.5ZM11.5 7C11.2239 7 11 7.22386 11 7.5V7.8C11 8.07614 11.2239 8.3 11.5 8.3H12.5C12.7761 8.3 13 8.07614 13 7.8V7.5C13 7.22386 12.7761 7 12.5 7H11.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H7.5C7.77614 10 8 10.2239 8 10.5V10.8C8 11.0761 7.77614 11.3 7.5 11.3H3.5C3.22386 11.3 3 11.0761 3 10.8V10.5ZM10.5 10C10.2239 10 10 10.2239 10 10.5V10.8C10 11.0761 10.2239 11.3 10.5 11.3H12.5C12.7761 11.3 13 11.0761 13 10.8V10.5C13 10.2239 12.7761 10 12.5 10H10.5Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">代码人生</span>
        </div>
        <div class="nav-cate-item" @click="handleClick('/reading')"
             :class="{active: activePath === '/reading'}"
        >
            <el-icon class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.9187 6.53385C15.0999 6.76744 14.9466 7.2 14.651 7.2H6.32905V4H5.02905V7.2H3.6C2.16406 7.2 1 6.03594 1 4.6C1 3.16406 2.16406 2 3.6 2H14.651C14.9466 2 15.0999 2.43257 14.9188 2.66616C14.5064 3.19779 14.2602 3.86959 14.2602 4.60001C14.2602 5.33043 14.5064 6.00222 14.9187 6.53385Z"
                          fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M1.34902 13.9998C1.0534 13.9998 0.900077 13.5672 1.08126 13.3337C1.49363 12.802 1.7398 12.1302 1.7398 11.3998C1.7398 10.6694 1.49362 9.9976 1.08125 9.46597C0.900064 9.23238 1.05339 8.7998 1.34901 8.7998H12.4C13.8359 8.7998 15 9.96386 15 11.3998C15 12.8357 13.8359 13.9998 12.4 13.9998H1.34902Z"
                          fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="name">阅读</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.nav-cate {
    padding: 10px;

    .nav-cate-item {
        display: flex;
        align-items: center;
        font-size: 16px;
        border-radius: var(--hami-radius);
        cursor: pointer;
        margin-bottom: 6px;
        height: 42px;
        padding: 10px 16px;
        color: var(--hami-menu-text-color);

        .name {
            height: 20px;
        }
    }

    .icon {
        margin-right: 10px;
        color: var(--hami-item-text-color);
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon.fix-ios {
        position: relative;
        top: -1px;
    }

    .icon.fix-ai {
        position: relative;
        top: -1px;
    }

    .nav-cate-item:last-child {
        margin-bottom: 0;
    }

    .nav-cate-item.active, .nav-cate-item:hover {
        color: var(--hami-menu-active-text-color);
        background-color: var(--hami-menu-active-bg);
        transition: background-color .3s;

        .icon {
            color: var(--hami-menu-active-text-color);
        }
    }
}
</style>