import { InjectionKey } from '@vue/runtime-core'

export const SPACE_USER = "SPACE_USER"
export const COMMENT_AREA_OWNER: InjectionKey<User> = Symbol("COMMENT_AREA_OWNER")
export const LOGIN_USER = "LOGIN_USER"

export const NOTIFY_STORE = "NOTIFY_STORE"

export const NOTIFY_LIST_REF = Symbol("NOTIFY_LIST_REF")

export const DRAFT_REF = Symbol("DRAFT")
export const ON_PUBLISH_ARTICLE = Symbol("ON_PUBLISH_ARTICLE")

export const LOGIN_REGISTER_SUCCESS: InjectionKey<Function> = Symbol("LOGIN_REGISTER_SUCCESS")