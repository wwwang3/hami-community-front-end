import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
            ],
            resolvers: [ElementPlusResolver()],
            dts: "types/auto-import.d.ts",
            eslintrc: {
                enabled: true
            }
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: "types/components.d.ts"
        })
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "src")
            }
        ]
    },
    server: {
        host: true,
        port: 8300
    },
    envDir: "env"
})
