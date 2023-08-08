/// <reference types="vite/client" />

declare interface ImportMetaEnv {

    /**
     * 后端接口基础路径
     */
    readonly VITE_BASE_API: string,
    /**
     * 后端接口公共前缀
     */
    readonly VITE_API_PREFIX: string
    readonly VITE_ROUTER_HISTORY: "hash" | "html5",
    readonly VITE_PUBLIC_PATH: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}