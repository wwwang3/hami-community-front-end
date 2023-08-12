/// <reference types="vite/client" />

declare interface ImportMetaEnv {

    /**
     * 后端接口基础路径
     */
    readonly VITE_BASE_API: string,
    readonly VITE_ROUTER_HISTORY: "hash" | "html5",
    readonly VITE_PUBLIC_PATH: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}