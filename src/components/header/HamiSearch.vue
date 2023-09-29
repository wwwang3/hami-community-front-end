<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search } from '@element-plus/icons-vue'
//interface
const keyword = ref('')
const handleSearch = () => {

}

</script>
<template>
    <el-input placeholder="探索Hami" size="large" v-model="keyword">
        <template #suffix>
            <el-icon :size="18" @click="handleSearch">
                <Search/>
            </el-icon>
        </template>
    </el-input>
</template>

<style scoped lang="less">

</style>